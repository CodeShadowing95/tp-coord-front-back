describe('Admin test', () => {
  const login = () => {
    cy.visit('/');
    cy.contains('Connexion').should('be.visible');

    cy.get('input[name="username"]').clear().type('admin');
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

  const deleteNoteByTitle = (title: string) => {
    cy.contains('h2', title)
      .closest('div.rounded-2xl')
      .within(() => {
        cy.get('[data-delete-note]').click();
      });
  };

  let note1Title: string;
  let note2Title: string;

  beforeEach(() => {
    login();

    const now = Date.now();
    note1Title = `Admin note 1 ${now}`;
    note2Title = `Admin note 2 ${now}`;

    createNote(note1Title, 'Content 1');
    createNote(note2Title, 'Content 2');
  })

  it('should see suitable title for admin', () => {
    cy.contains('Toutes les notes').should('be.visible');
  })

  it('should see delete button', () => {
    cy.get('[data-delete-note]').should('be.visible');
  })

  it('should create a new note', () => {
    const title = `Test Note ${Date.now()}`;
    const content = 'This is a test note.';
    createNote(title, content);
    cy.contains(content).should('be.visible');
  })

  it('should delete a note', () => {
    deleteNoteByTitle(note2Title);
    cy.contains(note2Title).should('not.exist');
  })
})
