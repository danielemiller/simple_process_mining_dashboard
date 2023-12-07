import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  errorMessage = '';  // Variable to store the error message

  constructor(public authService: AuthService, private router: Router, private userService: UserService) {}

  logout() {
    // Remove the token immediately and navigate to login
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']); // Redirect to login page
  
    // Optionally notify the server about the logout
    this.userService.logout().subscribe(
      data => {
        // Handle successful server response if needed
      },
      error => {
        // Log the error or handle it if necessary
        console.error('Error during logout:', error);
      }
    );
  }
  
}
