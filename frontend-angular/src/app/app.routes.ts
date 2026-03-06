import { Routes } from '@angular/router';
import { NoteListComponent } from './note-list.component/note-list.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';
import { LoginComponent } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NoteListComponent, canActivate: [authGuard] },
  { path: 'notes/:id', component: NoteDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'notes' }
];
