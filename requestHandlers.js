'use strict';

exports.iniciar = (req, res) => {
  console.log('Peticionó iniciar: ', req.path);
  res.sendFile('./views/createForm.html', { root: __dirname });
  // res.send('Inicio! ;)');
};

exports.defaultPath = (req, res) => {
  console.log('Peticionó: ', req.path);
  res.sendFile('./views/notFound.html', { root: __dirname });
};
