from flask import jsonify
import pm4py
from pm4py.objects.conversion.log import converter as log_converter
# from pm4py.objects.conversion.process_tree import converter as pt_converter
from pm4py.objects.conversion.process_tree.variants.to_bpmn import apply as pt_converter_apply
from pm4py.objects.bpmn.exporter import exporter as bpmn_exporter
from pm4py.objects.bpmn.importer.importer import apply as bpmn_importer_apply
from pm4py.objects.bpmn.layout.layouter import apply as apply_layout
from pm4py.algo.discovery.alpha import algorithm as alpha_miner
from pm4py.visualization.petri_net import visualizer as pn_visualizer
from pm4py.statistics.traces.generic.log import case_statistics
from bpmn_python.bpmn_diagram_rep import BpmnDiagramGraph
from bpmn_python.bpmn_diagram_layouter import generate_layout
import xml.etree.ElementTree as ET
from datetime import datetime
from collections import defaultdict
from io import BytesIO
import logging, os, io, pandas as pd, tempfile
from backend.app.models import EventLog
from backend.app.extensions import db
from dateutil import parser as dateutil_parser


class ProcessMiningService:
    @staticmethod
    def _parse_timestamp(timestamp):
        """Attempts to parse a timestamp string into a datetime object using multiple known formats."""
        known_formats = ['%m/%d/%y %H:%M', '%Y-%m-%d %H:%M:%S', '%d-%m-%Y %H:%M:%S']  # Add more formats as needed
        for fmt in known_formats:
            try:
                return pd.to_datetime(timestamp, format=fmt)
            except ValueError:
                continue
        # As a last resort, try to infer the format
        try:
            return dateutil_parser.parse(timestamp)
        except ValueError:
            raise ValueError(f"Unable to parse timestamp: {timestamp}")


    @staticmethod
    def _fetch_and_process_event_log(event_log_id, upload_folder):
        event_log = EventLog.query.get(event_log_id)
        if not event_log:
            raise ValueError("Event log not found")

        file_path = os.path.join(upload_folder, event_log.filename)
        with open(file_path, 'rb') as file:
            data = pd.read_csv(file)

            # Retrieve column names from the event log entry in the database
            activity_column = event_log.activity_column
            timestamp_column = event_log.timestamp_column
            case_key_column = event_log.case_key_column

            if not all([activity_column, timestamp_column, case_key_column]):
                raise ValueError("Column names for activity, timestamp, or case key are missing")

            # Dynamically rename columns based on values from the database
            data.rename(columns={
                activity_column: 'concept:name',
                timestamp_column: 'time:timestamp',
                case_key_column: '_CASE_KEY'
            }, inplace=True)

            # Convert 'time:timestamp' to datetime, attempting multiple formats
            data['time:timestamp'] = data['time:timestamp'].apply(ProcessMiningService._parse_timestamp)

            return data

    @staticmethod
    def process_discovery(event_log_id, representation_type, upload_folder):
        try:
            data = ProcessMiningService._fetch_and_process_event_log(event_log_id, upload_folder)
            data = data.sort_values('time:timestamp')
            parameters = {log_converter.Variants.TO_EVENT_LOG.value.Parameters.CASE_ID_KEY: '_CASE_KEY'}
            event_log = log_converter.apply(data, parameters=parameters, variant=log_converter.Variants.TO_EVENT_LOG)
            process_model, initial_marking, final_marking = alpha_miner.apply(event_log)

            if representation_type == 'text':
                return ProcessMiningService._text_representation(process_model)
            elif representation_type == 'graph':
                return ProcessMiningService._graph_representation(process_model, initial_marking, final_marking)
            elif representation_type == 'bpmn':
                return ProcessMiningService._bpmn_representation(event_log)
        except Exception as e:
            logging.error(f"Error during process discovery: {e}")
            raise


    @staticmethod
    def _text_representation(process_model):
        return str(process_model)

    @staticmethod
    def _graph_representation(process_model, initial_marking, final_marking):
        gviz = pn_visualizer.apply(process_model, initial_marking, final_marking)
        
        # Extract the DOT string from gviz
        dot_string = gviz.source
        return dot_string

    @staticmethod
    def _bpmn_representation(event_log):
        print('entered function')
        process_tree = pm4py.discover_process_tree_inductive(event_log)
        print('created event log')
        print(process_tree)

        # Convert the process tree to a BPMN model
        bpmn_model = pt_converter_apply(process_tree)
        print(bpmn_model)
        bpmn_model_with_layout = apply_layout(bpmn_model)
        print(bpmn_model_with_layout)

        # Now, use the bpmn_exporter to export the BPMN model to an XML string
        bpmn_xml_byte_data = bpmn_exporter.serialize(bpmn_model_with_layout)
        bpmn_xml_string_data = bpmn_xml_byte_data.decode('utf-8')  
        print(bpmn_xml_byte_data)
        print(bpmn_xml_string_data)

        return bpmn_xml_string_data


    @staticmethod
    def calculate_cycle_times(event_log_id, upload_folder):
        try:
            data = ProcessMiningService._fetch_and_process_event_log(event_log_id, upload_folder)
            event_log = log_converter.apply(data, parameters={log_converter.Variants.TO_EVENT_LOG.value.Parameters.CASE_ID_KEY: '_CASE_KEY'})
            durations = case_statistics.get_all_case_durations(event_log, parameters=None)
            average_duration = sum(durations) / len(durations)
            return {
                "average_cycle_time": average_duration,
                "max_cycle_time": max(durations),
                "min_cycle_time": min(durations)
            }
        except Exception as e:
            logging.error(f"Error calculating cycle times: {e}")
            raise

    @staticmethod
    def analyze_bottlenecks(event_log_id, upload_folder):
        try:
            data = ProcessMiningService._fetch_and_process_event_log(event_log_id, upload_folder)
            event_log = log_converter.apply(data, parameters={log_converter.Variants.TO_EVENT_LOG.value.Parameters.CASE_ID_KEY: '_CASE_KEY'})

            activity_frequency = defaultdict(int)
            waiting_times = defaultdict(list)
            activity_durations = defaultdict(list)

            for trace in event_log:
                for i in range(len(trace) - 1):
                    current_activity = trace[i]['concept:name']
                    next_activity = trace[i + 1]['concept:name']
                    activity_frequency[current_activity] += 1

                    end_time_current = trace[i]['time:timestamp']
                    start_time_next = trace[i + 1]['time:timestamp']
                    if isinstance(end_time_current, datetime) and isinstance(start_time_next, datetime):
                        waiting_time = (start_time_next - end_time_current).total_seconds()
                        waiting_times[(current_activity, next_activity)].append(waiting_time)

                    if 'start_timestamp' in trace[i]:
                        start_time_current = trace[i]['start_timestamp']
                        if isinstance(start_time_current, datetime) and isinstance(end_time_current, datetime):
                            duration = (end_time_current - start_time_current).total_seconds()
                            activity_durations[current_activity].append(duration)

            # Convert tuple keys to string format for JSON serialization
            average_waiting_times = {f'{act1} -> {act2}': sum(times) / len(times) if times else 0 for (act1, act2), times in waiting_times.items()}
            average_activity_durations = {act: sum(durations) / len(durations) if durations else 0 for act, durations in activity_durations.items()}

            return jsonify({
                'activity_frequency': dict(activity_frequency),
                'average_waiting_times': average_waiting_times,
                'average_activity_durations': average_activity_durations
            })

        except Exception as e:
            logging.error(f"Error analyzing bottlenecks: {e}")
            raise