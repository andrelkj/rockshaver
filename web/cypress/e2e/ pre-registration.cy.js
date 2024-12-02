describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    cy.visit("/");

    cy.get('header nav a[href="pre-cadastro"]').click();
    cy.get("form h2").should("be.visible").and("have.text", "Seus dados");

    cy.get('input[name="full-name"]').type("Customer Test");
    cy.get('input[name="email"]').type("customer@test.com");

    cy.contains('button[type="submit"]', "Continuar").click();
    cy.get(".user-name").should("be.visible").and("have.text", "Olá, Customer");
    cy.get(".user-email")
      .should("be.visible")
      .and("have.text", "customer@test.com");
  });

  it("Required fields", () => {
    cy.visit("/");

    cy.get('header nav a[href="pre-cadastro"]').click();
    cy.get("form h2").should("be.visible").and("have.text", "Seus dados");

    cy.contains('button[type="submit"]', "Continuar").click();

    cy.contains("label", "Nome Completo")
      .parent()
      .find(".alert-msg")
      .should("be.visible")
      .and("have.text", "O campo nome é obrigatório.");

    cy.contains("label", "E-mail")
      .parent()
      .find(".alert-msg")
      .should("be.visible")
      .and("have.text", "O campo e-mail é obrigatório.");
  });

  it("Should not complete pre-registration with the first name only", () => {
    cy.visit("/");

    cy.get('header nav a[href="pre-cadastro"]').click();
    cy.get("form h2").should("be.visible").and("have.text", "Seus dados");

    cy.get('input[name="full-name"]').type("Customer");
    cy.get('input[name="email"]').type("customer@test.com");

    cy.contains('button[type="submit"]', "Continuar").click();

    cy.contains("label", "Nome Completo")
      .parent()
      .find(".alert-msg")
      .should("be.visible")
      .and("have.text", "Informe seu nome completo.");
  });

  it("Should not complete pre-registration with invalid email", () => {
    cy.visit("/");

    cy.get('header nav a[href="pre-cadastro"]').click();
    cy.get("form h2").should("be.visible").and("have.text", "Seus dados");

    cy.get('input[name="full-name"]').type("Customer User");
    cy.get('input[name="email"]').type("www.customertest.com");

    cy.contains('button[type="submit"]', "Continuar").click();

    cy.contains("label", "E-mail")
      .parent()
      .find(".alert-msg")
      .should("be.visible")
      .and("have.text", "O e-mail inserido é inválido.");
  });
});
