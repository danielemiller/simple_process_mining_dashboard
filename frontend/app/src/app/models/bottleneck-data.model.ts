export interface BottleneckData {
    average_waiting_times: { [key: string]: number };
    average_activity_durations: { [key: string]: number };
    activity_frequency: { [key: string]: number };
  }