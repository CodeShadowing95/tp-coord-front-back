import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = 'http://localhost:9000/login';
  private readonly tokenKey = 'auth_token';

  login(username: string, password: string): Observable<string> {
    return this.http.post(this.apiUrl, { username, password }, { responseType: 'text' })
      .pipe(
        tap(token => this.setToken(token))
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = this.parseJwt(token);
      // console.log('Decoded JWT payload:', payload); // Debugging
      // Backend puts "ROLE_ADMIN" in scope. "SCOPE_" prefix is added by Spring Security decoder on backend, not present in raw token.
      return payload.scope && payload.scope.includes('ROLE_ADMIN');
    } catch (e) {
      console.error('Error parsing JWT', e);
      return false;
    }
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
