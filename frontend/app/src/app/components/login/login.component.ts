import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';  // Variable to store the error message

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      data => {
        localStorage.setItem('access_token', data.access_token);
        this.router.navigate(['/dashboard']); // Replace with your target route
      },
      error => {
        this.errorMessage = 'Failed to login. Please check your credentials.'; // Generic error message
        // For more detailed error handling, you can use 'error.error.message' or similar, depending on your API response
      }
    );
  }
}
