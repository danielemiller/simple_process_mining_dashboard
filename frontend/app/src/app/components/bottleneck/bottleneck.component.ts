import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProcessMiningService } from '../../services/process-mining.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BottleneckData } from '../../models/bottleneck-data.model';

@Component({
  selector: 'app-bottleneck',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './bottleneck.component.html',
  styleUrl: './bottleneck.component.css'
})
export class BottleneckComponent implements OnChanges {
  @Input() eventLogId: number | null = null;
  bottlenecks?: BottleneckData; 

  constructor(private processMiningService: ProcessMiningService, private router: Router) {}

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
