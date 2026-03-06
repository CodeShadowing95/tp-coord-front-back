import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Note } from "../models/note.model";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:9000/notes";

  public getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  public getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  public addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  public updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
  }

  public deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
