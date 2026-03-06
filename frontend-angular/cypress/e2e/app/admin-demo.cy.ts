describe('Admin test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.contains('Connexion').should('be.visible');

    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type(`${"password"}{enter}{enter}`)

    cy.url().should('include', '/notes');
    cy.get('body').then(($body) => {
      if ($body.text().includes('Aucune note trouvée')) {
        cy.contains('Aucune note trouvée').should('be.visible');
      } else {
        cy.get('[data-cy=note-list]').should('have.length.greaterThan', 0);
      }
    })
  })

  it('should see suitable title for admin', () => {
    cy.contains('Toutes les notes').should('be.visible');
  })

  it('should see delete button', () => {
    cy.get('[data-cy=note-list]').should('have.length.greaterThan', 0);
    cy.get('[data-delete-note]').should('be.visible');
  })

  it('should create a new note', () => {
    cy.get('[data-cy=create-note]').click();
    cy.get('[data-cy=note-title]').type('Test Note');
    cy.get('[data-cy=note-content]').type('This is a test note.');
    cy.get('[data-cy=save-note]').click();
    cy.contains('Note title').should('be.visible');
    cy.contains('Note content.').should('be.visible');
  })

  it('should delete a note', () => {
    cy.get('[data-cy=note-list]').should('have.length.greaterThan', 0);
    // cy.get('[data-delete-note]').first().click();
    //
  })
})
