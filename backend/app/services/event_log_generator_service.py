import logging
import pandas as pd
from faker import Faker
import os
from backend.app.core_processes.accounts_payable_process import AccountsPayableProcess
from backend.app.core_processes.accounts_receivable_process import AccountsReceivableProcess
from backend.app.core_processes.order_management_process import OrderManagementProcess
from backend.app.core_processes.procurement_process import ProcurementProcess

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

faker = Faker()

class EventLogGeneratorService:
    @staticmethod
    def generate_event_log(process_type, num_cases=300, base_path=''):
        logging.info(f"Starting to generate event log for process type: {process_type}")

        process_class = {
            "Procurement": ProcurementProcess,
            "Accounts Payable": AccountsPayableProcess,
            "Order Management": OrderManagementProcess,
            "Accounts Receivable": AccountsReceivableProcess
        }

        if process_type not in process_class:
            error_message = f"Invalid process type: {process_type}"
            logging.error(error_message)
            raise ValueError(error_message)

        process_instance = process_class[process_type]()
        events = []

        try:
            for case_num in range(num_cases):
                case_id = f"case_{case_num}"
                process_instance.current_group = 0  # Reset the current_group for the new case
                while process_instance.current_group < len(process_instance.activities_groups):
                    activity = process_instance.get_next_activity()
                    timestamp = faker.date_time_this_year(before_now=True, after_now=False)
                    event = {
                        "Event ID": f"event_{case_num}_{process_instance.current_group}",
                        "Case ID": case_id,
                        "Activity": activity,
                        "Timestamp": timestamp
                    }
                    events.append(event)
                    if process_instance.current_group == len(process_instance.activities_groups) - 1:
                        # If it's the last group, the process for this case is finished
                        break

            df = pd.DataFrame(events)
            df.sort_values(by=["Case ID", "Timestamp"], inplace=True)

            generated_logs_folder = os.path.join(base_path, 'generated_logs')
            os.makedirs(generated_logs_folder, exist_ok=True)
            logging.info(f"Ensured existence of directory: {generated_logs_folder}")

            file_name = f"{process_type.replace(' ', '_')}_event_log.csv"
            file_path = os.path.join(generated_logs_folder, file_name)
            df.to_csv(file_path, index=False)
            logging.info(f"Event log successfully saved to {file_path}")

            return file_path

        except Exception as e:
            logging.exception(f"Error occurred during event log generation: {e}")
            raise
