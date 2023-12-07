import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLog } from '../models/event-log.model';
import { map } from 'rxjs/operators';
import { ProcessRepresentationResponse } from '../models/process-representation-resposnse.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessMiningService {
  private apiUrl = 'http://localhost:5050'; // Flask API URL
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });

  constructor(private http: HttpClient) { }

  getEventLogs(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${this.apiUrl}/process_mining/event_logs`, { headers: this.headers });
  }

  getProcessRepresentation(eventLogId: number, representationType: 'text' | 'graph' | 'bpmn'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/process_mining/discovery`, {
      event_log_id: eventLogId,
      type: representationType
    }, { headers: this.headers});
  }

  calculateCycleTimes(eventLogId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate_cycle_times`, { event_log_id: eventLogId }, { headers: this.headers });
  }

  // New method to call the bottleneck analysis endpoint
  analyzeBottlenecks(eventLogId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/identify_bottlenecks`, { event_log_id: eventLogId }, { headers: this.headers });
  }


}