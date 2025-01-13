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

### Migrating from POM to Actions

Page Object Model can be trick sometimes when working with cross page elements and the Actions model can be very helpful for that purpose, once instead of defining functions per page, the functions are defined per actions (e.g. pre-registration actions from [prereg.js](/web/cypress/support/actions/prereg.js)):

1. first you define the functions within the actions file:

```js
class PreReg {
  start(fullName, email) {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]').click()

    cy.get('form h2').should('be.visible').and('have.text', 'Seus dados')

    cy.get('input[name="fullname"]').type(fullName)
    cy.get('input[name="email"]').type(email)

    cy.contains('button[type="submit"]', 'Continuar').click()
  }

  verify(firstName, email) {
    cy.get('.user-name')
      .should('be.visible')
      .and('have.text', 'Olá, ' + firstName)
    cy.get('.user-email').should('be.visible').and('have.text', email)
  }

  alert(fieldName, text) {
    cy.contains('label', fieldName)
      .parent()
      .find('.alert-msg')
      .should('be.visible')
      .and('have.text', text)
  }
}

export default new PreReg()
```

2. then you need to call the new funcions, replacing the old POM standard:

```js
describe("Pre-registration", () => {
  it.only("Should perform clients pre-registration", () => {
    // homePage.go();
    // homePage.header.goToPreReg();
    // preRegPage.fillForm("Customer Test", "customer@test.com");
    // preRegPage.submit();
    // homePage.header.verifyPreReg("Customer", "customer@test.com");

    prereg.start("Customer Test", "customer@test.com");
    prereg.verify("Customer", "customer@test.com");
  });
  ...
})
```

3. lastly some adaptations are made to cover different conditional paths (e.g. empty fields):

```js
class PreReg {
  start(fullName = '', email = '') {
    ...
    cy.get('input[name="fullname"]').as('fullName')
    cy.get('input[name="email"]').as('email')

    if (fullName) {
      cy.get('@fullName').type(fullName)
    }

    if (email) {
      cy.get('@email').type(email)
    }

    cy.contains('button[type="submit"]', 'Continuar').click()
  }
  ...
}
```

### Using cypress custom commands

Cypress has a built-in method to build actions that are reusable accross your test cases called custom commands that can be found under [commands.js](/web/cypress/support/commands.js). Using it you're able to create your own actions and name them as you would like:

1. First you define a custom action by adding a new command:

```js
// commands.js
Cypress.Commands.add('startPreRegistration', (fullName = '', email = '') => {
  {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]').click()

    cy.get('form h2').should('be.visible').and('have.text', 'Seus dados')

    cy.get('input[name="fullname"]').as('fullName')
    cy.get('input[name="email"]').as('email')

    if (fullName) {
      cy.get('@fullName').type(fullName)
    }

    if (email) {
      cy.get('@email').type(email)
    }

    cy.contains('button[type="submit"]', 'Continuar').click()
  }
})
```

2. Then you call this newly defined action within your test steps:

```js
// pre-registration.cy.js
describe('Pre-registration', () => {
  it('Should perform clients pre-registration', () => {
    cy.startPreRegistration('Customer Test', 'customer@test.com')
    cy.verifyPreRegistration('Customer', 'customer@test.com')
  })
  ...
})
```

**Note:** custom commands method is highly recommended when working with Cypress since it is build and optimized to this pattern.

## Tips and tricks

### Grouping components

To improve even more the POM you can define [components](/web/cypress/support/pages/components/) to represent parts of the design that can be shared across multiple pages (e.g. headers and footers):

1. Creating the component class [header.js](/web//cypress/support/pages/components/header.js):

```js
class Header {
  goToPreReg() {
    cy.get('header nav a[href="pre-cadastro"]').click()
  }

  verifyPreReg(firstName, email) {
    cy.get('.user-name')
      .should('be.visible')
      .and('have.text', 'Olá, ' + firstName)
    cy.get('.user-email').should('be.visible').and('have.text', email)
  }
}

export default new Header()
```

**Note:** both the redirect and the registry confirmation occurs checking for header elements so you can group them up inside the component.

2. Updating required steps to keep the flow running:

```js
import header from './components/header'

class HomePage {
  constructor() {
    this.header = header
  }

  go() {
    cy.visit('/')
  }
}

export default new HomePage()
```

**Note:** the first page is still the homepage so you need to create a function for the redirection.

3. Calling the functions using the POM:

```js
describe("Pre-registration", () => {
  it("Should perform clients pre-registration", () => {
    homePage.go();
    homePage.header.goToPreReg(); // using constructor to import header component as sub-section of the homePage class
    preRegPage.fillForm("Customer Test", "customer@test.com");
    preRegPage.submit();
    homePage.header.verifyPreReg("Customer", "customer@test.com");
  });
  ...
})
```

**Note:** you can use constructors (steps executed whenever a class is called) to import the header component so that you can use it as sub-sections of your main page.

### Working with Javascript

It is pretty common to use javascript within the cypress scripts, and it is possible to use some tools like [Javascript Playground](https://playcode.io/) to test and build javascript scripts outside of the test suite itself.

### Working with Local storage

For features as login, registration and others the users data is usually stored into the application local storage which make it a useful breakpoint for validation:

1. Open devtool's application tab and look for the local storage
2. Within Cypress use the window function to locate and get the values from the specific key you want:

```js
cy.window().then(win => {
  const chaveUsuario = win.localStorage.getItem('usuario') // store data from the actual window local storage key "usuario" on a variable
  expect(chaveUsuario).to.eql(JSON.stringify(usuario)) // assert the ocal storage key data against the expected user data
})
```

**Note:** the data retrieved from local storage is always in a string format, so you might need to consider converting either the string data from the local storage to a json object or the expected json object to a string.
