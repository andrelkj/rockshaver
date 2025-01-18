// Passo: Iniciar Agendamento
Cypress.Commands.add("iniciarAgendamento", () => {
  cy.contains("a", "Agendar um horário").click();
});

// Passo: Escolher o Profissional
Cypress.Commands.add("escolherProfissional", (profissional) => {
  cy.contains("span", "Membros da Equipe").should("be.visible"); // Checkpoint
  cy.contains("div", profissional).parent().click();
});

// Passo: Selecionar Serviço
Cypress.Commands.add("selecionarServico", (servico) => {
  cy.contains("span", "Serviços").should("be.visible"); // Checkpoint
  cy.contains("div", servico).parent().click();
});

// Passo: Escolher o Dia do Agendamento
Cypress.Commands.add("escolherDiaDoAgendamento", (dia) => {
  cy.contains("span", "Dias Disponíveis").should("be.visible"); // Checkpoint
  cy.contains(".dia-semana", dia).click();
});

// Passo: Escolher o Horário do Agendamento
Cypress.Commands.add("escolherHorarioDoAgendamento", (hora) => {
  cy.contains("span", "Horários Disponíveis").should("be.visible"); // Checkpoint
  cy.contains(".hora-opcao", hora).click();
});

// Passo: Finaliza o Agendamento
Cypress.Commands.add("finalizarAgendamento", () => {
  cy.contains("button", "Confirmar e reservar").click();
});
