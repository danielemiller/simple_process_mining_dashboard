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
  @Input() bpmnXml?: string;
  @ViewChild('canvas') private canvasRef!: ElementRef;

  private viewer?: BpmnViewer;

  constructor() { }

  ngAfterViewInit(): void {
    this.viewer = new BpmnViewer({ container: this.canvasRef.nativeElement });
    this.renderBpmn();
  }

  renderBpmn(): void {
    console.log('Attempting to render BPMN.');
  
    // Log the XML content that you are trying to import.
    if (this.bpmnXml) {
      console.log('BPMN XML:', this.bpmnXml);
    } else {
      console.warn('No BPMN XML provided.');
      return; // Exit if there is no XML to render.
    }
  
    // Ensure the viewer is initialized before attempting to import XML.
    if (this.viewer) {
      console.log('Viewer is initialized, importing XML...');
      this.viewer.importXML(this.bpmnXml, (err, warnings) => {
        if (err) {
          console.error('Failed to import BPMN XML', err);
        } else {
          console.log('BPMN XML imported successfully.', warnings);
          // Log any warnings that might have occurred during import.
          if (warnings) {
            console.warn('Import warnings:', warnings);
          }
          // Attempt to zoom the canvas to fit the viewport and log any potential errors.
          try {
            this.viewer?.get('canvas').zoom('fit-viewport');
          } catch (zoomErr) {
            console.error('Failed to zoom BPMN canvas', zoomErr);
          }
        }
      });
    } else {
      console.error('Viewer is not initialized.');
    }
  }
}
