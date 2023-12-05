import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private uploadUrl = 'http://localhost:5050/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Retrieve the JWT token from local storage or your authentication service
    const token = localStorage.getItem('access_token'); // Adjust this line to wherever you store the token

    // If the token is not present, you may need to handle this case
    if (!token) {
      console.error('JWT token not found');
      return; // You should handle this case appropriately
    }

    // Create headers to include the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.uploadUrl, formData, { headers: headers });
  }
}
