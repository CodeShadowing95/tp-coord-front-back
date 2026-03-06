import { Component, Input } from '@angular/core';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-note-component',
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {

  @Input() note!: Note;

}
