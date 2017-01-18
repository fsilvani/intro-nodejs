"use strict";
const route = require('./router').route;

exports.iniciar = (app) => {

  route(app);

  app.listen(8080, () => {
    console.log('Server ready and listening on port 8080!');
  });
};
