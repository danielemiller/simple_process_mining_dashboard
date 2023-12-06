import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import BpmnViewer from 'bpmn-js';

@Component({
  selector: 'app-process-bpmn-representation',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './process-bpmn-representation.component.html',
  styleUrl: './process-bpmn-representation.component.css'
})
export class ProcessBpmnRepresentationComponent implements AfterViewInit {
  @Input() bpmnXml?: string; // BPMN XML string from the backend
  @ViewChild('canvas') private canvasRef?: ElementRef;

  private viewer: BpmnViewer;
  
  constructor(router: Router) {
    this.viewer = new BpmnViewer({ container: '#canvas' });
  }

  ngAfterViewInit() {
    this.renderBpmn();
  }

  renderBpmn() {
    if (this.bpmnXml) {
      this.viewer.importXML(this.bpmnXml, (err) => {
        if (err) {
          console.error('Error rendering BPMN', err);
        } else {
          this.viewer.get('canvas').zoom('fit-viewport');
        }
      });
    }
  }
}
