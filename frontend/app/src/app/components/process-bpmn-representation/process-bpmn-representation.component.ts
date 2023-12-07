import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpmnVisualization, FitType } from 'bpmn-visualization';

@Component({
  selector: 'app-process-bpmn-representation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-bpmn-representation.component.html',
  styleUrls: ['./process-bpmn-representation.component.css']
})
export class ProcessBpmnRepresentationComponent implements AfterViewInit {
  @Input() bpmnXml?: string;

  private bpmnVisualization!: BpmnVisualization;

  constructor() { }

  ngAfterViewInit(): void {
    this.bpmnVisualization = new BpmnVisualization({ container: 'bpmn-container', navigation: { enabled: true } });
    this.renderBpmn();
  }

  renderBpmn(): void {
    const fitType = FitType.Center
    if (this.bpmnXml) {
      this.bpmnVisualization.load(this.bpmnXml, { fit: {type: fitType} });
    }
  }
}
