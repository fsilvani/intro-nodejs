"use strict";
const express = require('express');
const app = express();
const server = require('./server');

server.iniciar(app);
