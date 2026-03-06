import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NoteCardComponent } from '../note-card-component/note-card.component';
import { Note } from '../models/note.model';
import { NoteService } from '../services/note.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteCardComponent, FormsModule],
  templateUrl: './note-list.component.html',
})
export class NoteListComponent {
  private authService = inject(AuthService);
  private noteService = inject(NoteService);
  private cdr = inject(ChangeDetectorRef);

  notes: Note[] = [];

  isModalOpen = false;

  newNote: Note = {
    id: 0,
    title: '',
    content: '',
  };

  ngOnInit(): void {

    this.noteService.getNotes().subscribe({

      next: (note) => {
        this.notes = note;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Call API error : ", err),
    });
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }

  public addNote() {
    this.noteService.addNote(this.newNote).subscribe({
      next: (note) => {
        this.notes.push(note);
        this.closeModal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Call API error : ", err),
    });
  }
}

