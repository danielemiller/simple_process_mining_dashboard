import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProcessMiningService } from '../../services/process-mining.service';
import { EventLog } from '../../models/event-log.model';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-event-logs-list',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './event-logs-list.component.html',
  styleUrl: './event-logs-list.component.css'
})
export class EventLogsListComponent implements OnInit {
  eventLogs: EventLog[] = []; 
  selectedEventLog: EventLog | null = null;
  @Output() eventLogSelected = new EventEmitter<EventLog>();
  
  constructor(private processMiningService: ProcessMiningService, private router: Router) {}

  ngOnInit() {
    this.processMiningService.getEventLogs().subscribe(
      (data: EventLog[]) => { // Replace 'any' with the appropriate type
        this.eventLogs = data;
      },
      (error: any) => {
        console.error('Error fetching event logs:', error);
      }
    );
  }

  selectEventLog(eventLog: EventLog): void {
    this.selectedEventLog = eventLog;
    this.eventLogSelected.emit(eventLog);
    // Here you could emit an event or call another service to inform other parts of your application that a new event log has been selected.
    console.log(`Selected event log: ${eventLog.filename}`);
  }
}
