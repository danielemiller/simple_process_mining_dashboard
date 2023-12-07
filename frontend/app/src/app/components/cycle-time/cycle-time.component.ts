import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProcessMiningService } from '../../services/process-mining.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-cycle-time',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './cycle-time.component.html',
  styleUrl: './cycle-time.component.css'
})
export class CycleTimeComponent {
  @Input() eventLogId: number | null = null;

  cycleTimes: any; // Define a proper type for your data structure

  constructor(private processMiningService: ProcessMiningService, private router: Router) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('CycleTimeComponent ngOnChanges called', changes);
    if (changes['eventLogId'] && this.eventLogId) {
      console.log('entered if block')
      this.fetchCycleTimes();
    }
  }

  fetchCycleTimes(): void {
    // Implement this method in your service
    if (this.eventLogId){
      this.processMiningService.calculateCycleTimes(this.eventLogId)
      .subscribe(data => {
        this.cycleTimes = data;
      }, error => {
        console.error('Error fetching cycle times:', error);
      });
    } else {
      console.error('No event log selected');
    }
  }
    
}
