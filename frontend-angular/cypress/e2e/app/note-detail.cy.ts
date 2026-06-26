describe('Note test', () => {
  const login = (username: string) => {
    cy.visit('/');
    cy.contains('Connexion').should('be.visible');

    cy.get('input[name="username"]').clear().type(username);
    cy.get('input[name="password"]').clear().type('password');
    cy.contains('button', 'Se connecter').click();

    cy.url().should('include', '/notes');
  };

  const createNote = (title: string, content: string) => {
    cy.get('[data-cy=create-note]').click();
    cy.get('[data-cy=note-title]').clear().type(title);
    cy.get('[data-cy=note-content]').clear().type(content);
    cy.get('[data-cy=save-note]').click();
    cy.contains(title, { timeout: 10000 }).should('be.visible');
  };

  const openNoteDetailByTitle = (title: string) => {
    cy.contains('h2', title)
      .closest('div.rounded-2xl')
      .within(() => {
        cy.get('[data-note-id]').click();
      });
  };

  let note1Title: string;
  let note2Title: string;

  beforeEach(() => {
    login('user');

    const now = Date.now();
    note1Title = `New note 1 ${now}`;
    note2Title = `New note 2 ${now}`;

    createNote(note1Title, 'Content 1');
    createNote(note2Title, 'Content 2');
  })

  it('should display the note detail for the first note', () => {
    openNoteDetailByTitle(note1Title);
    cy.location('pathname').should('match', /\/notes\/\d+$/);
    cy.contains(note1Title).should('be.visible');
  })

  it('should display the note detail for the second note', () => {
    openNoteDetailByTitle(note2Title);
    cy.location('pathname').should('match', /\/notes\/\d+$/);
    cy.contains(note2Title).should('be.visible');
  })
})
