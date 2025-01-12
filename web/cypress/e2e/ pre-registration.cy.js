describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    cy.startPreRegistration("Customer Test", "customer@test.com");
    cy.verifyPreRegistration("Customer", "customer@test.com");
  });

  it("Required fields", () => {
    cy.startPreRegistration();
    cy.alertHave("Nome Completo", "O campo nome é obrigatório.");
    cy.alertHave("E-mail", "O campo e-mail é obrigatório.");
  });

  it("Should not complete pre-registration with the first name only", () => {
    cy.startPreRegistration("Customer", "customer@test.com");
    cy.alertHave("Nome Completo", "Informe seu nome completo.");
  });

  it("Should not complete pre-registration with invalid email", () => {
    cy.startPreRegistration("Customer", "www.customertest.com");
    cy.alertHave("E-mail", "O e-mail inserido é inválido.");
  });
});
