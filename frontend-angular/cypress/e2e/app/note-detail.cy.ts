describe('Note test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.contains('Connexion').should('be.visible');

    cy.get('input[name="username"]').type('user');
    cy.get('input[name="password"]').type(`${"password"}{enter}{enter}`)

    cy.url().should('include', '/notes');
  })

  it('should display the note detail for the first note', () => {
    cy.get('[data-note-id="1"]').click();
    cy.url().should('include', '/notes/1');
    cy.contains('New note 1').should('be.visible');
  })

  it('should display the note detail for the second note', () => {
    cy.get('[data-note-id="2"]').click();
    cy.url().should('include', '/notes/2');
    cy.contains('New note 1').should('be.visible');
  })
})
