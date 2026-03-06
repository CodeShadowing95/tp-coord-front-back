import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { NoteListComponent } from './note-list.component';
import { NoteService } from '../services/note.service';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let mockNoteService: any;

  beforeEach(async () => {
    mockNoteService = {
      getNotes: jest.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [NoteListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: NoteService, useValue: mockNoteService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all notes', () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(component.notes).toEqual([]);
  });

  it('should handle error when getting notes fails', () => {
    // Arrange - Préparation des données
    const errorResponse = new Error('API Error');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockNoteService.getNotes.mockReturnValue(throwError(() => errorResponse));

    // Act - Exécution de l'action à tester
    component.ngOnInit();

    // Assert - Vérification du résultat attendu
    expect(console.error).toHaveBeenCalledWith("Call API error : ", errorResponse);
  });
});
