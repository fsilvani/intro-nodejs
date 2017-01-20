'use strict';
const querystring = require('querystring');
const http = require('http');

exports.iniciar = (req, res) => {
  console.log('Peticionó iniciar: ', req.path);
  res.sendFile('./views/createForm.html', { root: __dirname });
};

exports.views = (req, res) => {
  console.log('Peticionó estilos: ', req.path);
  res.sendFile('.' + req.path, { root: __dirname });
};

exports.addCampaign = (req, res) => {
  console.log('Peticionó: ', req.path);

  let form_data = req.body;

  let post_data = Object.assign({
    "campaign_type":"SERVER_BEHAVIOR",
  }, form_data);

  // Build the post string from an object
  // post_data = querystring.stringify(post_data);

  console.log(post_data);

  // An object of options to indicate where to post to
  const post_options = {
    host: 'host',
    port: '8087',
    path: '/api/path',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(post_data)
    }
  };
  // Set up the request
  const post_req = http.request(post_options, res => {
    res.setEncoding('utf8');
    res.on('data', chunk => {
        console.log('Response: ' + chunk);
    });
  });

  post_req.on('error', e => {
    console.log('problem with request: ' + e.message);
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

  // res.sendFile('./views/createForm.html', { root: __dirname });
};

exports.defaultPath = (req, res) => {
  console.log('Peticionó: ', req.path);
  res.sendFile('./views/notFound.html', { root: __dirname });
};
