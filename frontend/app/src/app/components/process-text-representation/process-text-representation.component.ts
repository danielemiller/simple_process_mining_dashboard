import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-process-text-representation',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './process-text-representation.component.html',
  styleUrls: ['./process-text-representation.component.css']
})
export class ProcessTextRepresentationComponent {
  @Input() textRepresentation: string | null = null;

  constructor(private router: Router) {}
}
