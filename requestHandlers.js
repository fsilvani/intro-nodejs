'use strict';
const querystring = require('querystring');
const http = require('http');
const request = require('request');

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

  let formData = req.body;

  let postData = Object.assign({
    "campaign_type":"SERVER_BEHAVIOR",
  }, formData);

  postData.priority = Number(postData.priority);
  postData.segment_size = Number(postData.segment_size);
  postData.start_date = '2017-01-17T00:00:00.000-03:00';
  postData.end_date = '2017-01-20T00:00:00.000-03:00';
  postData.segments = [];

  // hardcodeo 4 para luego analizar refactor para volver dinámico el agregado de segmentos
  for (var i = 1; i <= 4; i++) {
    postData.segments.push({
      type: 'QUESTION',
      tag: postData[`segment${i}_tag`],
      questions_id: postData[`segment${i}_questions_id`]
    });
    delete postData[`segment${i}_tag`];
    delete postData[`segment${i}_questions_id`];
  }

  console.log(postData);

  // Build the post string from an object
  postData = querystring.stringify(postData);

  const options = {
    host: 'host',
    port: 8087,
    path: '/api/...',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const request = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  request.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  // request.write(postData);
  request.write(postData);
  request.end();

  // res.sendFile('./views/createForm.html', { root: __dirname });
};

exports.defaultPath = (req, res) => {
  console.log('Peticionó: ', req.path);
  res.sendFile('./views/notFound.html', { root: __dirname });
};
