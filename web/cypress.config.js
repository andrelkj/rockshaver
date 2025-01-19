require("dotenv").config();

const { configurePlugin } = require("cypress-mongodb");

module.exports = {
  env: {
    mongodb: {
      uri: process.env.MONGO_URL,
      database: process.env.DATABASE,
    },
    baseApi: process.env.API_URL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
    baseUrl: process.env.WEB_URL,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
};
