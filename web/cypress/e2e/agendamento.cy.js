import calendario from "../fixtures/calendario.json";

describe("Agendamento", () => {
  beforeEach(function () {
    cy.fixture("agendamentos").then((agendamentos) => {
      this.agendamentos = agendamentos;
    });
  });

  it("Deve fazer um novo agendamento", function () {
    const agendamento = this.agendamentos.sucesso;

    cy.dropCollection("agendamentos", {
      failSilently: "true",
    }).then((result) => {
      cy.log(result);
    });

    cy.intercept("GET", "http://localhost:3333/api/calendario", {
      statusCode: 200,
      body: calendario,
    }).as("getCalendario");

    cy.iniciarPreCadastro(agendamento.usuario);
    cy.verificarPreCadastro(agendamento.usuario);

    cy.iniciarAgendamento();
    cy.escolherProfissional(agendamento.profissional);
    cy.selecionarServico(agendamento.servico.descricao);
    cy.escolherDiaDoAgendamento(agendamento.dia);
    cy.escolherHorarioDoAgendamento(agendamento.hora);
    cy.finalizarAgendamento();

    cy.get("h3")
      .should("be.visible")
      .and("have.text", "Tudo certo por aqui! Seu horário está confirmado.");
  });
});
