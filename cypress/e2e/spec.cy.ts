// TODO: Write E2E tests
describe('My First Test', () => {
  beforeEach(() => {
    cy.authenticate();
  });

  it('Should logout', () => {
    cy.visit('/');
    cy.get('main button').should('contain', 'Logout').click();
    cy.get('main button').should('contain', 'Authenticate');
  });

  it('Visit budgets', () => {
    cy.visit('/budgets');
    cy.get('mat-card:nth-child(3)').should('contain', "Grant's Budget (CAD)");
  });
});
