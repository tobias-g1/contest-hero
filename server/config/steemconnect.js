const sc2 = require('steemconnect');

const api = sc2.Initialize({
  app: process.env.SC_IDENTITY,
  callbackURL: process.env.SC_CALLBACK
});

module.exports = api;