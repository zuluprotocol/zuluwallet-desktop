export {}

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      clean(): Chainable<Subject>
    }
  }
}

Cypress.Commands.add('clean', () => {
  return cy.exec('yarn run e2e:clean')
})
