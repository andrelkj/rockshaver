describe("Agebdanebti", () => {
  it("Deve fazer um novo agendamento", () => {
    cy.dropCollection("agendamentos", {
      failSilently: "true",
    }).then((result) => {
      cy.log(result);
    });

    const usuario = {
      nome: "Agendamento Teste",
      email: "agendamento@teste.com",
    };

    cy.iniciarPreCadastro(usuario);
    cy.verificarPreCadastro(usuario);

    cy.contains("a", "Agendar um horário").click();
    cy.contains("span", "Membros da Equipe").should("be.visible"); // Checkpoint

    cy.contains("div", "Tina").parent().click();
    cy.contains("span", "Serviços").should("be.visible"); // Checkpoint

    cy.contains("div", "Combo").parent().click();
    cy.contains("span", "Dias Disponíveis").should("be.visible"); // Checkpoint
    cy.contains("span", "Horários Disponíveis").should("be.visible"); // Checkpoint

    cy.contains(".dia-semana", "13").click();

    cy.contains(".hora-opcao", "10:00").click();
    cy.contains("button", "Confirmar e reservar").click();

    cy.get("h3")
      .should("be.visible")
      .and("have.text", "Tudo certo por aqui! Seu horário está confirmado.");
  });
});
