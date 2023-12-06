import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BottleneckComponent } from '../bottleneck/bottleneck.component';
import { CycleTimeComponent } from '../cycle-time/cycle-time.component';


@Component({
  selector: 'app-process-analysis',
  standalone: true,
  imports: [ CommonModule, RouterLink, BottleneckComponent, CycleTimeComponent],
  templateUrl: './process-analysis.component.html',
  styleUrl: './process-analysis.component.css'
})
export class ProcessAnalysisComponent {
  @Input() eventLogId?: number;
  
  constructor(private router: Router) {}

}
