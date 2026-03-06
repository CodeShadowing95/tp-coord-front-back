import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Note } from '../models/note.model';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-card-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css',
})
export class NoteCardComponent {
  private authService = inject(AuthService);
  private noteService = inject(NoteService);

  @Input() note!: Note;

  public messageObj: object = {};

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public updateNote(noteId: number) {
    return;
  }

  public deleteNote(noteId: number) {
    if (!this.authService.isAdmin()) {
      this.messageObj = {
        message: 'Seul un administrateur peut supprimer une note',
        type: 'danger'
      };
      return;
    }

    this.noteService.deleteNote(noteId).subscribe({
      next: () => {
        this.messageObj = {
          message: `Note avec l'ID ${noteId} supprimée avec succès`,
          type: 'success'
        };
        console.log(`Note avec l'ID ${noteId} supprimée avec succès`);
      },
      error: (error) => {
        this.messageObj = {
          message: `Erreur lors de la suppression de la note avec l'ID ${noteId}`,
          type: 'danger'
        };
        console.error(`Erreur lors de la suppression de la note avec l'ID ${noteId}`, error);
      }

    });
  }

}
