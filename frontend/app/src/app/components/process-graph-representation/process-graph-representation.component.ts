import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import * as d3 from 'd3';
import { graphviz } from 'd3-graphviz';

@Component({
  selector: 'app-process-graph-representation',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './process-graph-representation.component.html',
  styleUrl: './process-graph-representation.component.css'
})
export class ProcessGraphRepresentationComponent implements AfterViewInit {
  @Input() graphData!: string; // DOT format string

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.renderGraph();
  }

  renderGraph() {
    if (this.graphData) {
      graphviz('#graph').renderDot(this.graphData);
    }
  }
}
