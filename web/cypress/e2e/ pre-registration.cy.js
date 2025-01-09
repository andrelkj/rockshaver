import prereg from "../support/actions/prereg";

describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    prereg.start("Customer Test", "customer@test.com");
    prereg.verify("Customer", "customer@test.com");
  });

  it("Required fields", () => {
    prereg.start();
    prereg.alert("Nome Completo", "O campo nome é obrigatório.");
    prereg.alert("E-mail", "O campo e-mail é obrigatório.");
  });

  it("Should not complete pre-registration with the first name only", () => {
    prereg.start("Customer", "customer@test.com");
    prereg.alert("Nome Completo", "Informe seu nome completo.");
  });

  it("Should not complete pre-registration with invalid email", () => {
    prereg.start("Customer", "www.customertest.com");
    prereg.alert("E-mail", "O e-mail inserido é inválido.");
  });
});
