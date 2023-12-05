import { Component } from '@angular/core';
import { EventLog } from '../../models/event-log.model';
import { ProcessMiningService } from '../../services/process-mining.service';

@Component({
  selector: 'app-process-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './process-dashboard.component.html',
  styleUrl: './process-dashboard.component.css'
})
export class ProcessDashboardComponent {
  currentEventLog: EventLog | null = null;
  showEventLogsList: boolean = false;
  textRepresentation: string | null = null;

  constructor(private processMiningService: ProcessMiningService) {}

  onEventLogSelected(eventLog: EventLog): void {
    this.currentEventLog = eventLog;
    // Now you can use this event log data for further processing
  }

  fetchTextRepresentation() {
    if (this.currentEventLog) { // Check if currentEventLog is not null
      this.processMiningService.getTextRepresentation(this.currentEventLog.id, 'text')
        .subscribe(data => {
          this.textRepresentation = data.text_representation;
        }, error => {
          console.error('Error fetching text representation:', error);
        });
    } else {
      console.log('No event log selected');
    }
  }
}
