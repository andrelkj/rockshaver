describe("Login", () => {
  it("Should login successfully", () => {
    cy.visit("/");

    cy.get('header nav a[href="entrar"]').click();
    cy.get("form h2").should("be.visible").and("have.text", "Seus dados");

    cy.get('input[placeholder="Nome"]').type('Customer Test')
    cy.get('input[placeholder="E-mail"]').type('customer@test.com')
    cy.get('input[placeholder="Whatsapp"]').type('11999999999')

    cy.contains('button[type="submit"]', 'Continuar').click()
    cy.get('.user-name').should('be.visible').and('have.text', 'Customer Test')
    cy.get('.user-email').should('be.visible').and('have.text', 'customer@test.com')
  });
});
