# Rockshave

## Docker

The project is structured to use a docker comntainer that contains the api, web and mobile application images that we'll use to run the application locally.

### Installation and configuration

- In order to use the existent docker images we'll first need to install [Docker Desktop](https://www.docker.com/) to your desired OS.
- Once it is installed we also need to instantiate the remote containers to our local machine by running the terminal command `docker compose up -d`
- Web and mobile applications runs locally, respectivelly, against `localhost:3000` and `localhost:8100` ports while the database manager runs against `localhost:17017` port

**Note:** the `-d` argument specify the detach option which will run docker in the background while still allowing the terminal to be queried freely

It is also posible to remove docker containers and images running the terminal `docker compose down` command.

**Note:** be aware that this command will remove containers, images, and any storage (e.g. database information). Once executed existent storage is lost and you'll need to compose a fresh container to use it's images again.

## Best practices

### Filtering locators by visual identification

One common approach to finding complex locators in test automation is to use XPath which provide a precise way to finding DOM elements (e.g. `//label[text()="Nome Completo"]/..//div[contains(@class,"alert-msg")]`), although Cypress doesn't provide support to XPath and even though there might be external libraries, extensions or plugins that can fullfil this need theres an alternative and build in approach in Cypress that is a better fit using the `parent()` function:

```js
cy.contains('label', 'Nome Completo')
  .parent()
  .find('.alert-msg')
  .should('be.visible')
  .and('include.text', 'O campo nome é obrigatório')
```

**Note:** visual identification method focused on finding locators per visual snipets (as you would in a manual test)

### Adopting a model to write the tests (POM)

One of the most common code standards is the Page Object Model (POM) which group actions or functions related to the same page in one same file (e.g. [pre-reg.page.js](./web/cypress/support/pages/pre-reg.page.js)).

How to use:

1. Create a file and a class that will represent one page as in [pre-reg.page.js](./web/cypress/support/pages/pre-reg.page.js) and include all required actions as functions:

```js
class PreRegPage {
  go() {
    cy.visit('/')
    cy.get('header nav a[href="pre-cadastro"]').click()

    cy.get('form h2').should('be.visible').and('have.text', 'Seus dados')
  }

  fillForm(fullName, email) {
    cy.get('input[name="fullname"]').type(fullName)
    cy.get('input[name="email"]').type(email)
  }

  submit() {
    cy.contains('button[type="submit"]', 'Continuar').click()
  }

  verifyPreReg(firstName, email) {
    cy.get('.user-name')
      .should('be.visible')
      .and('have.text', 'Olá, ' + firstName)
    cy.get('.user-email').should('be.visible').and('have.text', email)
  }

  alertHave(fieldName, text) {
    cy.contains('label', fieldName)
      .parent()
      .find('.alert-msg')
      .should('be.visible')
      .and('have.text', text)
  }
}

export default new PreRegPage()
```

**Note:** remember to export the class so that you can use it on other files.

2. Import and call for specific pages functions as in [pre-registration.cy.js](./web/cypress/e2e/%20pre-registration.cy.js):

```js
import preRegPage from "../support/pages/pre-reg.page";

describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    preRegPage.go();
    preRegPage.fillForm("Customer Test", "customer@test.com");
    preRegPage.submit();

    cy.get(".user-name").should("be.visible").and("have.text", "Olá, Customer");
    cy.get(".user-email")
      .should("be.visible")
      .and("have.text", "customer@test.com");
  });
  ...
})
```

**Note:** Page Object Model (POM) can be trick when working with integrated steps (e.g. redirections).