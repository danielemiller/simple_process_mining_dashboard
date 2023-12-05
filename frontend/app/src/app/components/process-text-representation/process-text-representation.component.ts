import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-process-text-representation',
  templateUrl: './process-text-representation.component.html',
  styleUrls: ['./process-text-representation.component.css']
})
export class ProcessTextRepresentationComponent {
  @Input() textRepresentation: string | null = null;

  constructor() { }
}
