import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';  // Import throwError

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private uploadUrl = 'http://localhost:5050/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, activityColumn: string, timestampColumn: string, caseKeyColumn: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('activityColumn', activityColumn);
    formData.append('timestampColumn', timestampColumn);
    formData.append('caseKeyColumn', caseKeyColumn);

    // Retrieve the JWT token from local storage or your authentication service
    const token = localStorage.getItem('access_token'); // Adjust this line to wherever you store the token

    // If the token is not present, return an observable that errors out
    if (!token) {
      console.error('JWT token not found');
      return throwError(() => new Error('JWT token not found')); // Properly handle the case where token is not found
    }

    // Create headers to include the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.uploadUrl, formData, { headers: headers, reportProgress: true, observe: 'events' });
  }
}
