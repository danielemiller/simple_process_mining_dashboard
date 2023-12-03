import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authUrl = 'http://localhost:5050';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password });
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/register`, { username, email, password });
  }

  logout() {
    localStorage.removeItem('access_token');
    return this.http.post<any>(`${this.authUrl}/logout`, 'Logging logout action to server.')
  }

  refreshToken(refreshToken: string) {
    return this.http.post<any>(`${this.authUrl}/refresh`, { refreshToken });
  }

  requestPasswordReset(email: string) {
    return this.http.post<any>(`${this.authUrl}/password-reset-request`, { email });
  }
  
  resetPassword(token: string, newPassword: string) {
    return this.http.post<any>(`${this.authUrl}/reset-password`, { token, newPassword });
  }

  getUserProfile() {
    return this.http.get<any>(`${this.authUrl}/profile`);
  }

  updateUserProfile(userData: any) {
    return this.http.put<any>(`${this.authUrl}/profile`, userData);
  }

  enable2FA() {
    return this.http.post<any>(`${this.authUrl}/enable-2fa`, {});
  }

  verify2FA(code: string) {
    return this.http.post<any>(`${this.authUrl}/verify-2fa`, { code });
  }
  
}
