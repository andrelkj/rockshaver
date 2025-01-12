describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    const user = {
      fullName: "Customer Test",
      email: "customer@test.com",
    };

    cy.startPreRegistration(user);
    cy.verifyPreRegistration(user);
  });

  it("Required fields", () => {
    cy.startPreRegistration();
    cy.alertHave("Nome Completo", "O campo nome é obrigatório.");
    cy.alertHave("E-mail", "O campo e-mail é obrigatório.");
  });

  it("Should not complete pre-registration with the first name only", () => {
    const user = {
      fullName: "Customer",
      email: "customer@test.com",
    };

    cy.startPreRegistration(user);
    cy.alertHave("Nome Completo", "Informe seu nome completo.");
  });

  it("Should not complete pre-registration with invalid email", () => {
    const user = {
      fullName: "Customer Test",
      email: "www.customertest.com",
    };

    cy.startPreRegistration(user);
    cy.alertHave("E-mail", "O e-mail inserido é inválido.");
  });
});
