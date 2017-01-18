"use strict";
const requestHandlers = require('./requestHandlers');

exports.route = (app) => {
  app.get('/', (req, res) => {
    requestHandlers.iniciar(req, res);
  });
  app.get('*', (req, res) => {
    requestHandlers.defaultPath(req, res);
  });
};
