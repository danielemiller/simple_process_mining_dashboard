import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLog } from '../models/event-log.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessMiningService {
  private apiUrl = 'http://localhost:5050'; // Flask API URL

  constructor(private http: HttpClient) { }

  getEventLogs(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${this.apiUrl}/process_mining/event_logs`);
  }

  getProcessRepresentation(eventLogId: number, representationType: 'text' | 'graph' | 'bpmn'): Observable<any> {
    return this.http.post(`${this.apiUrl}/process_mining/discovery`, {
      event_log_id: eventLogId,
      type: representationType
    });
  }

  calculateCycleTimes(eventLogId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate_cycle_times`, { event_log_id: eventLogId });
  }

  // New method to call the bottleneck analysis endpoint
  analyzeBottlenecks(eventLogId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/identify_bottlenecks`, { event_log_id: eventLogId });
  }


}