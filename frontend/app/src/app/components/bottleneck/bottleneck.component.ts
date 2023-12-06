import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProcessMiningService } from '../../services/process-mining.service';

@Component({
  selector: 'app-bottleneck',
  standalone: true,
  imports: [ Input, SimpleChange ],
  templateUrl: './bottleneck.component.html',
  styleUrl: './bottleneck.component.css'
})
export class BottleneckComponent implements OnChanges {
  @Input() eventLogId?: number;
  bottlenecks: any; // Define a proper type for your data structure

  constructor(private processMiningService: ProcessMiningService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventLogId'] && this.eventLogId) {
      this.fetchBottlenecks();
    }
  }

  fetchBottlenecks(): void {
    if (this.eventLogId){
      this.processMiningService.analyzeBottlenecks(this.eventLogId)
      .subscribe(data => {
        this.bottlenecks = data;
      }, error => {
        console.error('Error fetching bottlenecks:', error);
      });
    } else {
      console.error('No event log selected');
    }
    
  }
}
