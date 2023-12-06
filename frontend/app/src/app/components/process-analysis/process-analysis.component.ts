import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-process-analysis',
  standalone: true,
  imports: [],
  templateUrl: './process-analysis.component.html',
  styleUrl: './process-analysis.component.css'
})
export class ProcessAnalysisComponent {
  @Input() eventLogId?: number;
}
