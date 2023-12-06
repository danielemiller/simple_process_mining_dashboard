import pm4py
from pm4py.objects.conversion.log import converter as log_converter
from pm4py.objects.log.util import dataframe_utils
from pm4py.objects.conversion.process_tree import converter as pt_converter
from pm4py.objects.bpmn.exporter import exporter as bpmn_exporter
from pm4py.algo.discovery.alpha import algorithm as alpha_miner
from pm4py.visualization.petri_net import visualizer as pn_visualizer
from pm4py.statistics.traces.generic.log import case_statistics
from datetime import datetime
from collections import defaultdict
import pandas as pd
import logging, os
from backend.app.models import EventLog
from backend.app.extensions import db

class ProcessMiningService:

    @staticmethod
    def _fetch_and_process_event_log(event_log_id, upload_folder):
        event_log = EventLog.query.get(event_log_id)
        if not event_log:
            raise ValueError("Event log not found")

        file_path = os.path.join(upload_folder, event_log.filename)
        with open(file_path, 'rb') as file:
            data = pd.read_csv(file)
            data = dataframe_utils.convert_timestamp_columns_in_df(data)
            return data

    @staticmethod
    def process_discovery(event_log_id, representation_type, upload_folder):
        try:
            data = ProcessMiningService._fetch_and_process_event_log(event_log_id, upload_folder)
            data = data.sort_values('time:timestamp')
            parameters = {log_converter.Variants.TO_EVENT_LOG.value.Parameters.CASE_ID_KEY: 'case_id'}
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
        return pn_visualizer.serialize(gviz)

    @staticmethod
    def _bpmn_representation(event_log):
        process_tree = pm4py.discover_process_tree_inductive(event_log)
        bpmn_model = pt_converter.apply(process_tree)
        bpmn_xml = bpmn_exporter.apply_to_string(bpmn_model)
        return bpmn_xml

    @staticmethod
    def calculate_cycle_times(event_log_id, upload_folder):
        try:
            data = ProcessMiningService._fetch_and_process_event_log(event_log_id, upload_folder)
            event_log = log_converter.apply(data, parameters={log_converter.Variants.TO_EVENT_LOG.value.Parameters.CASE_ID_KEY: 'case_id'})
            durations = case_statistics.get_all_casedurations(event_log, parameters=None)
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
            event_log = log_converter.apply(data, parameters={log_converter.Variants.TO_EVENT_LOG.value.Parameters.CASE_ID_KEY: 'case_id'})
            
            activity_frequency = defaultdict(int)
            waiting_times = defaultdict(list)
            activity_durations = defaultdict(list)

            for trace in event_log:
                for i in range(0, len(trace) - 1):
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

            average_waiting_times = {act_pair: sum(times) / len(times) for act_pair, times in waiting_times.items()}
            average_activity_durations = {act: sum(durations) / len(durations) for act, durations in activity_durations.items()}

            return activity_frequency, average_waiting_times, average_activity_durations
        except Exception as e:
            logging.error(f"Error analyzing bottlenecks: {e}")
            raise