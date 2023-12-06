import { Component } from '@angular/core';
import { EventLog } from '../../models/event-log.model';
import { ProcessMiningService } from '../../services/process-mining.service';

@Component({
  selector: 'app-process-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './process-dashboard.component.html',
  styleUrls: ['./process-dashboard.component.css'] // Corrected to 'styleUrls' and made it an array
})
export class ProcessDashboardComponent {
  currentEventLog: EventLog | null = null;
  activeTab: 'text' | 'graph' | 'bpmn' | null = null;

  textRepresentation: string | null = null;
  graphData: any | null = null; // Adjust the type based on your graph data
  bpmnXml: string | null = null;

  constructor(private processMiningService: ProcessMiningService) {}

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
        .subscribe(data => {
          switch (type) {
            case 'text':
              this.textRepresentation = data['text_representation'];
              break;
            case 'graph':
              this.graphData = data['graph_representation'];
              break;
            case 'bpmn':
              this.bpmnXml = data['bpmn_representation'];
              break;
          }
        }, error => {
          console.error(`Error fetching ${type} representation:`, error);
        });
    } else {
      console.error('No event log selected');
    }
  }
}
