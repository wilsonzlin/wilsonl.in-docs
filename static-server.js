"use strict";

const express = require('express');
const server = express();

server.use(express.static(__dirname + '/dist'));

server.listen(3072);
