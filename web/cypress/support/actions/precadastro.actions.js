// Passo: Iniciar Pré-Cadastro
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

// Passo: Verificar Pré-Cadastro
Cypress.Commands.add("verificarPreCadastro", (usuario) => {
  cy.get(".usuario-nome")
    .should("be.visible")
    .and("have.text", "Olá, " + usuario.nome.split(" ")[0]);
  cy.get(".usuario-email").should("be.visible").and("have.text", usuario.email);

  cy.window().then((win) => {
    const chaveUsuario = win.localStorage.getItem("usuario");
    expect(chaveUsuario).to.eql(JSON.stringify(usuario));
  });
});

// Passo: Executar Pré-Cadastro no Local Storage
Cypress.Commands.add("preCadastroLS", (usuario) => {
  cy.window().then((win) => {
    win.localStorage.setItem("usuario", JSON.stringify(usuario));

    cy.visit("/");
    cy.contains(usuario.email).should("be.visible");
  });
});

// Passo: Verificar Alerta
Cypress.Commands.add("verificarAlerta", (campo, texto) => {
  cy.contains("label", campo)
    .parent()
    .find(".alert-msg")
    .should("be.visible")
    .and("have.text", texto);
});
