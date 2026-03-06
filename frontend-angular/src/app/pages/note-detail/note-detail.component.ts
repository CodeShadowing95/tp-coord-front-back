import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './note-detail.component.html'
})
export class NoteDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noteService = inject(NoteService);

  noteId!: number;
  note$!: Observable<Note>;

  ngOnInit() {
    this.noteId = Number(this.route.snapshot.paramMap.get('id')!);
    this.note$ = this.noteService.getNoteById(this.noteId);
  }

  goBack() {
    history.back();
  }

  delete() {
    this.noteService.deleteNote(this.noteId).subscribe(() => {
      this.router.navigate(['/notes']);
    });
  }
}
