describe('Should work', function () {
  it('test', function () {
    cy.log('PORT', Cypress.env('TEST_PORT'))

    cy.visit(`http://localhost:${Cypress.env('TEST_PORT')}`)
    cy.contains('City bike app')
  })
})
