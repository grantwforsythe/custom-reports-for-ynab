/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable<Subject = any> {
    authenticate(): Chainable<any>;
    logout(): Chainable<any>;
  }
}

Cypress.Commands.add('authenticate', () => {
  cy.log('Authenticating');
  window.localStorage.setItem('accessToken', Cypress.env('AUTH_TOKEN'));
  window.localStorage.setItem('expiresAt', (new Date().getTime() + 7200 * 1000).toString());
});

Cypress.Commands.add('logout', () => {
  cy.log('Logging out');
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('expiresAt');
});
