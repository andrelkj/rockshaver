import preRegPage from "../support/pages/pre-reg.page";

describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    preRegPage.go();
    preRegPage.fillForm("Customer Test", "customer@test.com");
    preRegPage.submit();
    preRegPage.verifyPreReg("Customer", "customer@test.com");
  });

  it("Required fields", () => {
    preRegPage.go();
    // preRegPage.fillForm("Customer Test", "customer@test.com");
    preRegPage.submit();
    preRegPage.alertHave("Nome Completo", "O campo nome é obrigatório.");
    preRegPage.alertHave("E-mail", "O campo e-mail é obrigatório.");
  });

  it("Should not complete pre-registration with the first name only", () => {
    preRegPage.go();
    preRegPage.fillForm("Customer", "customer@test.com");
    preRegPage.submit();
    preRegPage.alertHave("Nome Completo", "Informe seu nome completo.");
  });

  it("Should not complete pre-registration with invalid email", () => {
    preRegPage.go();
    preRegPage.fillForm("Customer Test", "www.customertest.com");
    preRegPage.submit();
    preRegPage.alertHave("E-mail", "O e-mail inserido é inválido.");
  });
});
