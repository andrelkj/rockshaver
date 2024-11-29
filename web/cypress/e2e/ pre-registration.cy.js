describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    cy.visit("/");

    cy.get('header nav a[href="pre-cadastro"]').click();
    cy.get("form h2").should("be.visible").and("have.text", "Seus dados");

    cy.get('input[name="nome"]').type('Customer Test')
    cy.get('input[name="email"]').type('customer@test.com')

    cy.contains('button[type="submit"]', 'Continuar').click()
    cy.get('.user-name').should('be.visible').and('have.text', 'Customer Test')
    cy.get('.user-email').should('be.visible').and('have.text', 'customer@test.com')
  });
});
