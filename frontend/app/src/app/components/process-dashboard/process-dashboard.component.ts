import { Component } from '@angular/core';
import { EventLog } from '../../models/event-log.model';
import { ProcessMiningService } from '../../services/process-mining.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProcessBpmnRepresentationComponent } from '../process-bpmn-representation/process-bpmn-representation.component';
import { ProcessGraphRepresentationComponent } from '../process-graph-representation/process-graph-representation.component';
import { ProcessTextRepresentationComponent } from '../process-text-representation/process-text-representation.component';
import { EventLogsListComponent } from '../event-logs-list/event-logs-list.component';
import { ProcessRepresentationResponse } from '../../models/process-representation-resposnse.model';

@Component({
  selector: 'app-process-dashboard',
  standalone: true,
  imports: [ CommonModule, RouterLink, EventLogsListComponent, ProcessBpmnRepresentationComponent, ProcessGraphRepresentationComponent, ProcessTextRepresentationComponent],
  templateUrl: './process-dashboard.component.html',
  styleUrls: ['./process-dashboard.component.css'] 
})
export class ProcessDashboardComponent {
  currentEventLog: EventLog | null = null;
  activeTab: 'text' | 'graph' | 'bpmn' | null = null;
  showEventLogsList: boolean = false;

  textRepresentation: string | null = null;
  graphData: any | null = null; // Adjust the type based on your graph data
  bpmnXml: string | null = null;

  constructor(private processMiningService: ProcessMiningService, router: Router) {}

  onEventLogSelected(eventLog: EventLog): void {
    this.currentEventLog = eventLog;
    this.resetRepresentations();
    // Optionally fetch the default representation here if desired
  }

  resetRepresentations(): void {
    this.textRepresentation = null;
    this.graphData = null;
    this.bpmnXml = null;
  }

  selectTab(tab: 'text' | 'graph' | 'bpmn'): void {
    this.activeTab = tab;
    // Clear existing data when switching tabs
    this.resetRepresentations();
    // Fetch new representation based on selected tab
    if (this.currentEventLog) {
      this.fetchRepresentation(tab);
    } else {
      console.error('No event log selected');
    }
  }

  fetchRepresentation(type: 'text' | 'graph' | 'bpmn'): void {
    if (this.currentEventLog) {
      this.processMiningService.getProcessRepresentation(this.currentEventLog.id, type)
        .subscribe((data: ProcessRepresentationResponse) => {
          switch (type) {
            case 'text':
              this.textRepresentation = data['text_representation'] ?? null;
              break;
            case 'graph':
              this.graphData = data['graph_representation'] ?? null;
              break;
            case 'bpmn':
              this.bpmnXml = data['bpmn'] ?? null;
              break;
          }
          console.log(this.bpmnXml)
          console.log(data);

        }, error => {
          console.error(`Error fetching ${type} representation:`, error);
        });
    } else {
      console.error('No event log selected');
    }
  }
}
