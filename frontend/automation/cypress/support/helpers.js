export function unlockWallet(name, passphrase) {
  cy.getByTestId(`wallet-${name}`).click()
  authenticate(passphrase)
  // wait for form to be unmounted so that other elements can be interacted with as
  // the dialog adds pointer-events: none to the body element
  cy.getByTestId('passphrase-form').should('not.exist')
}

export function authenticate(passphrase) {
  cy.getByTestId('passphrase-form').should('be.visible')
  cy.getByTestId('input-passphrase').type(passphrase)
  cy.getByTestId('input-submit').click()
}
