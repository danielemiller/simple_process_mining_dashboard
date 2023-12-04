import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.userService.register(this.username, this.email, this.password).subscribe(
      data => {
        this.successMessage = 'Registration successful. You can now login.';
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          // Generic error message if no specific message is available
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    );
  }
}
