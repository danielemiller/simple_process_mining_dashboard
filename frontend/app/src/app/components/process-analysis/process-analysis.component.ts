import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BottleneckComponent } from '../bottleneck/bottleneck.component';
import { CycleTimeComponent } from '../cycle-time/cycle-time.component';
import { SharedDataService } from '../../services/shared-data.service';
import { EventLogsListComponent,  } from '../event-logs-list/event-logs-list.component';
import { EventLog } from '../../models/event-log.model';


@Component({
  selector: 'app-process-analysis',
  standalone: true,
  imports: [ CommonModule, RouterLink, BottleneckComponent, CycleTimeComponent, EventLogsListComponent],
  templateUrl: './process-analysis.component.html',
  styleUrl: './process-analysis.component.css'
})
export class ProcessAnalysisComponent {
  currentEventLog?: EventLog ;
  showEventLogsList: boolean = false;
  
  constructor(private router: Router, private sharedDataService: SharedDataService,) {}

  get eventLogId(): number | null {
    return this.sharedDataService.eventLogId;
  }

  onEventLogSelected(eventLog: EventLog): void {
    this.currentEventLog = eventLog;
    this.sharedDataService.eventLogId = eventLog.id;
    // Optionally fetch the default representation here if desired
  }

  
}
