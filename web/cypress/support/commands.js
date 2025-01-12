// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("iniciarPreCadastro", (usuario) => {
  {
    cy.visit("/");

    cy.get('header nav a[href="pre-cadastro"]').click();

    cy.get("form h2").should("be.visible").and("have.text", "Seus dados");

    cy.get('input[name="fullname"]').as("nome");
    cy.get('input[name="email"]').as("email");

    if (usuario?.nome) {
      cy.get("@nome").type(usuario.nome);
    }

    if (usuario?.email) {
      cy.get("@email").type(usuario.email);
    }

    cy.contains('button[type="submit"]', "Continuar").click();
  }
});

Cypress.Commands.add("verificarPreCadastro", (usuario) => {
  cy.get(".user-name")
    .should("be.visible")
    .and("have.text", "Olá, " + usuario.nome.split(" ")[0]);
  cy.get(".user-email").should("be.visible").and("have.text", usuario.email);
});

Cypress.Commands.add("verificarAlerta", (campo, texto) => {
  cy.contains("label", campo)
    .parent()
    .find(".alert-msg")
    .should("be.visible")
    .and("have.text", texto);
});
