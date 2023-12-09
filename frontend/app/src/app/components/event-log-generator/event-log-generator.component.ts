import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcessMiningService } from '../../services/process-mining.service';


@Component({
  selector: 'app-event-log-generator',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './event-log-generator.component.html',
  styleUrl: './event-log-generator.component.css'
})
export class EventLogGeneratorComponent implements OnInit {
  selectedProcess: string = 'Procurement';

  constructor(private processMiningService: ProcessMiningService) { }

  ngOnInit(): void {
  }

  generateAndDownloadLog() {
    this.processMiningService.generateEventLog(this.selectedProcess)
      .subscribe(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${this.selectedProcess}_event_log.csv`;
        link.click();
        window.URL.revokeObjectURL(link.href);
      });
  }
}