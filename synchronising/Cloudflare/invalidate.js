"use strict";

const request = require('request');
const getCredentials = require('../Auth/getCredentials');
const getResourcesInfo = require('../Auth/getResourcesInfo');
const assertValidKey = require('./_assertValidKey');

const CREDENTIALS = getCredentials();
const APP_RESOURCES_INFO = getResourcesInfo();

const invalidate = (...keys) => {
  keys.forEach(key => assertValidKey(key));

  return new Promise((resolve, reject) => {
    request({
      method: 'DELETE',
      url: `https://api.cloudflare.com/client/v4/zones/${APP_RESOURCES_INFO.CLOUDFLARE_ZONE_ID}/purge_cache`,
      headers: {
        'X-Auth-Email': CREDENTIALS.CLOUDFLARE_EMAIL,
        'X-Auth-Key': CREDENTIALS.CLOUDFLARE_GLOBAL_API_KEY,
      },
      body: {
        files: keys.map(key => `${APP_RESOURCES_INFO.CLOUDFLARE_SITE}${key}`),
      },
      json: true,
    }, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      if (body.errors) {
        body.errors.forEach(err => console.error(`Error ${err.code}: ${err.message}`));
      }

      if (body.messages) {
        body.messages.forEach(msg => console.info(msg));
      }

      if (body.success) {
        keys.forEach(key => {
          console.log(`Invalidated ${key}`);
        });
      } else {
        reject(new Error('Cloudflare API call not successful'));
      }
    });
  });
};

module.exports = invalidate;
