"use strict";

const fs = require('fs');
const express = require('express');
const compression = require('compression');

const SERVER_PORT = 3072;
const APP_URL_PATH_PREFIX = '/docs';
const REDIRECTS_JSON_PATH = __dirname + '/static-server-redirects.json';

let redirects = {};

function reloadRedirects() {
    console.log(`Reloading redirects...`);
    redirects = JSON.parse(fs.readFileSync(REDIRECTS_JSON_PATH, 'utf8'));
}

reloadRedirects();
fs.watch(REDIRECTS_JSON_PATH, () => {
    reloadRedirects();
});

let server = express();

server.use((req, res, next) => {
    let to = redirects[req.path];

    if (to !== undefined) {
        res.redirect(to);
    } else {
        next();
    }
});

server.use(compression());
server.use(APP_URL_PATH_PREFIX, express.static(__dirname + '/dist', {
    dotfiles: "allow",
    index: "index.html",
    redirect: false,
}));

server.get('/', (req, res) => {
    res.redirect(APP_URL_PATH_PREFIX + '/');
});

server.listen(SERVER_PORT, () => {
    console.log(`wilsonl.in-docs static server is now listening on port ${ SERVER_PORT }`);
});
