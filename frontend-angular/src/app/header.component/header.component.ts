import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header.component',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
  }
}
