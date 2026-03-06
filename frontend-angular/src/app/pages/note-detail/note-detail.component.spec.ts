import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';

import { NoteDetailComponent } from './note-detail.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-dummy-notes',
  template: '<p>Notes</p>',
  standalone: true,
})
class DummyNotesComponent { }

const settle = async () => {
  await Promise.resolve();
  await new Promise((r) => setTimeout(r, 0));
  await Promise.resolve();
};

describe('NoteDetail', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;
  let router: Router;

  const noteServiceMock = {
    deleteNote: jest.fn(),
    getNoteById: jest.fn()
  };

  beforeEach(async () => {

    const mockedNote = { id: 1, title: 'title', content: 'content' };

    await TestBed.configureTestingModule({
      imports: [NoteDetailComponent, DummyNotesComponent],
      providers: [
        provideRouter(
          [{ path: 'notes', component: DummyNotesComponent }]
        ),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { note: mockedNote },
              paramMap: convertToParamMap({ id: '1' }),
            },
          },
        },
        { provide: NoteService, useValue: noteServiceMock },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    noteServiceMock.getNoteById.mockReturnValue(of(mockedNote));
    fixture.detectChanges();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.noteId).toBe(1);
    expect(component.note$).toBeDefined();

  });

  it('should delete note service mock', async () => {
    //Arrange
    noteServiceMock.deleteNote.mockReturnValueOnce(of(void 0));

    // Act
    component.delete();

    // Assert
    await settle();
    expect(router.url).toBe('/notes');
    expect(noteServiceMock.deleteNote).toHaveBeenCalledTimes(1);
    expect(noteServiceMock.deleteNote).toHaveBeenCalledWith(1);
  });

});
