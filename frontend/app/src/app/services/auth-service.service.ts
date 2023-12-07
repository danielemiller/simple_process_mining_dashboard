import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // This function checks if the user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    // Add more robust checks here as necessary
    return !!token;
  }
}
