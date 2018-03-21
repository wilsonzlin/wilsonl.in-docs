"use strict";

const fs = require('fs');
const express = require('express');
const compression = require('compression');

const SERVER_PORT = 3072;
const APP_URL_PATH_PREFIX = '/docs';

let server = express();

server.use(compression());
server.use(APP_URL_PATH_PREFIX, express.static(__dirname + '/dist'));

server.get('/', (req, res) => {
  res.redirect(APP_URL_PATH_PREFIX + '/');
});

server.listen(SERVER_PORT, () => {
  console.log(`wilsonl.in-docs static server is now listening on port ${SERVER_PORT}`);
});
