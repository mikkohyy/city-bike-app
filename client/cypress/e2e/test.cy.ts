describe('Should work', function () {
  it('test', function () {
    cy.visit('http://localhost:3000')
    cy.contains('City bike app')
  })
})
