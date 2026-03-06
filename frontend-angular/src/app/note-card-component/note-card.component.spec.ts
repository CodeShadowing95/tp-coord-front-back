import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { NoteCardComponent } from './note-card.component';
import { Note } from '../models/note.model';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let mockAuthService: any;
  let mockNoteService: any;

  beforeEach(async () => {
    mockAuthService = {
      isAdmin: jest.fn().mockReturnValue(true)
    };

    mockNoteService = {
      deleteNote: jest.fn().mockReturnValue(of(void 0))
    };

    await TestBed.configureTestingModule({
      imports: [NoteCardComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: NoteService, useValue: mockNoteService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    component.note = new Note(1, 'Titre', 'Contenu');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a note when deleteNote is called as admin', () => {
    // Arrange
    const mockNote = new Note(1, 'Titre', 'Contenu');
    const noteId = mockNote.id;

    // Act
    component.deleteNote(noteId);

    // Assert
    expect(mockAuthService.isAdmin).toHaveBeenCalled();
    expect(mockNoteService.deleteNote).toHaveBeenCalledWith(noteId);
    expect(component.messageObj).toEqual({
      message: `Note avec l'ID ${noteId} supprimée avec succès`,
      type: 'success'
    });
  });

  it('should show error message when non-admin tries to delete a note', () => {
    // Arrange
    const noteId = 1;
    mockAuthService.isAdmin.mockReturnValue(false);

    // Act
    component.deleteNote(noteId);

    // Assert
    expect(mockAuthService.isAdmin).toHaveBeenCalled();
    expect(mockNoteService.deleteNote).not.toHaveBeenCalled();
    expect(component.messageObj).toEqual({
      message: 'Seul un administrateur peut supprimer une note',
      type: 'danger'
    });
  });
});
