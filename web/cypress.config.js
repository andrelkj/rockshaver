const { configurePlugin } = require("cypress-mongodb");

module.exports = {
  env: {
    mongodb: {
      uri: "mongodb://cypress:skills@localhost:27017",
      database: "rockshaver",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
};
