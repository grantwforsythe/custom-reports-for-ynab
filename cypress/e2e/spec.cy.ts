describe('My First Test', () => {
  beforeEach(() => {
    cy.authenticate();
  });

  it('Should logout', () => {
    cy.visit('/');
    cy.get('header button').should('contain', 'Logout').click();
    cy.get('header button').should('contain', 'Authenticate');
  });

  it('Should visit budgets', () => {
    cy.visit('/budgets');
    cy.get('main').contains("Grant's Budget (CAD)");
  });

  it('Should reroute to home page on 404', () => {
    cy.visit('/bad-route');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/');
    });
  });
});
