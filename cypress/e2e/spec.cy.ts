describe('Custom Reports for YNAB', () => {
  beforeEach(() => {
    cy.authenticate();
  });

  afterEach(() => {
    cy.logout();
  });

  describe('Home', () => {
    it('Should logout', () => {
      cy.visit('/');
      cy.get('header button').last().should('contain', 'Logout').click();
      cy.get('header button').should('contain', 'Authenticate');
      cy.get('header a').should('not.contain', 'Report');
    });

    it('Should create new issue on GitHub', () => {
      cy.visit('/');
      cy.get('header a')
        .last()
        .should('contain', 'Report')
        .should(
          'have.attr',
          'href',
          'https://github.com/grantwforsythe/custom-reports-for-ynab/issues/new?assignees=grantwforsythe&labels=bug&projects=&template=bug-report.yml&title=%5BBUG%5D',
        );
    });

    it('Should reroute to home page on 404', () => {
      cy.visit('/bad-route');
      cy.location().should((location) => expect(location.pathname).to.eq('/'));
    });
  });

  describe('Privacy', () => {
    beforeEach(() => {
      cy.log('Routing home');
      cy.visit('/');
    });

    it('Should route to privacy page', () => {
      cy.get('p a').contains('privacy policy').click();
      cy.location().should((location) => expect(location.pathname).to.eq('/privacy'));
      cy.get('h1').should('contain', 'Privacy Policy');
      cy.get('div a').should('have.attr', 'href', 'https://api.ynab.com/#terms');
    });

    it('Should access privacy page when not authenticated', () => {
      cy.get('header button').last().should('contain', 'Logout').click();
      cy.visit('/privacy');
      cy.get('h1').should('contain', 'Privacy Policy');
    });
  });

  describe('Budget', () => {
    it('Should visit budgets', () => {
      cy.visit('/');
      cy.get('header a').first().click();
      cy.location().should((location) => expect(location.pathname).to.eq('/budgets'));
      cy.get('main').should('contain', "Grant's Budget (CAD)");
    });

    it('Should not be able to visit budgets when not authenticated', () => {
      cy.visit('/');
      cy.get('header button').last().should('contain', 'Logout').click();
      cy.visit('/budgets');
      cy.location().should((location) => expect(location.pathname).to.eq('/'));
    });
  });

  describe('Dashboard', () => {
    it('Should render vertical bar chart', () => {
      cy.visit('/budgets');
      cy.get('main').contains("Grant's Budget (CAD)").click();
      // Check that the route ends with /dashboard
      cy.location().should((location) => expect(location.pathname).to.match(/\/dashboard$/));
      // cy.get('mat-select[formControlName=chartType]').click().get('mat-option').contains('Apple Inc.').click();
      cy.get('form mat-select').first().contains('Vertical Bar Chart');
      cy.get('ul.legend-labels > li').should((categories) => {
        // TODO: Check that the number of categories in the legend is equal to the number of bars
        expect(categories).to.have.length.greaterThan(0);
      });
    });
  });
});
