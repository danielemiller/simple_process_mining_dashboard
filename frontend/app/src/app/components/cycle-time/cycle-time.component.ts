import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProcessMiningService } from '../../services/process-mining.service';

@Component({
  selector: 'app-cycle-time',
  standalone: true,
  imports: [ Input, SimpleChange ],
  templateUrl: './cycle-time.component.html',
  styleUrl: './cycle-time.component.css'
})
export class CycleTimeComponent {
  @Input() eventLogId?: number;

  cycleTimes: any; // Define a proper type for your data structure

  constructor(private processMiningService: ProcessMiningService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventLogId'] && this.eventLogId) {
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
