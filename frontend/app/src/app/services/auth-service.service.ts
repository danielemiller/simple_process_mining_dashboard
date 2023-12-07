import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.checkTokenExpiry();
    }, 60000); // Check every minute
  }
  
  // Method to check if the JWT token has expired
  checkTokenExpiry(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token); // Using 'any' to bypass strict type checking
        const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : null; // Convert to milliseconds

        if (expirationTime && Date.now() >= expirationTime) {
          this.handleLogout();
        }
      } catch (e) {
        // Handle decoding error (e.g., invalid token)
        console.error('Token decoding error:', e);
        this.handleLogout();
      }
    }
  }

  // Logout method
  handleLogout(): void {
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('Logout error:', error);
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return false;
    }
  
    try {
      const decodedToken = jwtDecode<any>(token);
      const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : null;
  
      if (!expirationTime || Date.now() >= expirationTime) {
        // If the token is expired, or expiration time is not available
        return false;
      }
  
      return true;
    } catch (e) {
      // Handle decoding error (e.g., invalid token)
      console.error('Token decoding error:', e);
      return false;
    }
  }
}
