"use strict";

const express = require('express');
const compression = require('compression');

let server = express();

server.use(compression());
server.use('/docs', express.static(__dirname + '/dist'));

server.listen(3072);
