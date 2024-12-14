import preRegPage from "../support/pages/pre-reg.page";
import homePage from "../support/pages/home.page";

describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    homePage.go();
    homePage.header.goToPreReg();
    preRegPage.fillForm("Customer Test", "customer@test.com");
    preRegPage.submit();
    homePage.header.verifyPreReg("Customer", "customer@test.com");
  });

  it("Required fields", () => {
    homePage.go();
    homePage.header.goToPreReg();
    // preRegPage.fillForm("Customer Test", "customer@test.com");
    preRegPage.submit();
    preRegPage.alertHave("Nome Completo", "O campo nome é obrigatório.");
    preRegPage.alertHave("E-mail", "O campo e-mail é obrigatório.");
  });

  it("Should not complete pre-registration with the first name only", () => {
    homePage.go();
    homePage.header.goToPreReg();
    preRegPage.fillForm("Customer", "customer@test.com");
    preRegPage.submit();
    preRegPage.alertHave("Nome Completo", "Informe seu nome completo.");
  });

  it("Should not complete pre-registration with invalid email", () => {
    homePage.go();
    homePage.header.goToPreReg();
    preRegPage.fillForm("Customer Test", "www.customertest.com");
    preRegPage.submit();
    preRegPage.alertHave("E-mail", "O e-mail inserido é inválido.");
  });
});
