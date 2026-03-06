import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  model = {
    username: '',
    password: ''
  }

  login() {
    this.authService.login(this.model.username, this.model.password).subscribe({
      next: () => {
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
