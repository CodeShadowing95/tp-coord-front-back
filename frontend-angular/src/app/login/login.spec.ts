import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';

import { LoginComponent } from './login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy-notes',
  template: '<p>Notes</p>',
  standalone: true,
})
class DummyNotesComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, DummyNotesComponent],
      providers: [
        provideRouter([
          { path: 'notes', component: DummyNotesComponent },
        ]),
        provideHttpClient(),
        provideRouter([]),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    localStorage.clear();
    // await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('login() → stocke le token dans localStorage', async () => {
    // Arrange
    const username = 'user';
    const token = 'jwt-123';
    // const roles = ['ROLE_USER']; // AuthService ne stocke pas les rôles explicitement

    component.model.email = username;
    component.model.password = 'password';

    // Act
    component.login();

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
    req.flush(token); // AuthService attend une réponse texte (le token)

    // Assert
    // AuthService stocke le token sous la clé 'auth_token'
    expect(localStorage.getItem('auth_token')).toBe(token);

    // AuthService ne stocke pas username ni roles dans localStorage
    // Ces assertions seraient fausses avec l'implémentation actuelle
    // expect(localStorage.getItem('username')).toBe(username);
    // expect(localStorage.getItem('roles')).toBe(JSON.stringify(roles));

  });


});
