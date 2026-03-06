describe('Demo Form fill test', () => {
  it('should display the main page', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Connexion').should('be.visible');

    cy.get('input[name="username"]').type('user');
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
})
