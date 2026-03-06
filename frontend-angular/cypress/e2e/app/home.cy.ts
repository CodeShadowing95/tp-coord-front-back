describe('home page test', () => {
  it('should display home page', () => {
    // Act
    cy.visit('http://localhost:4200')
    // Assert
    cy.contains('Connexion').should('be.visible');
  })
})
