'use strict';

const fs = require('fs');
const CookiesParser = require('../cookiesParser').CookiesParser;
const Server = require('../server').Server;

class Routes {
  constructor(req, res) {
    this.files = Routes.getFiles();
    this.routes = {
      '/': Routes.index(req, res),
    };
    this.makeRoutes();
  }

  static getFiles() {
    return fs.readdirSync('./routes', { withFileTypes: true, });
  }

  static index(req, res) {
    const ip = req.connection.remoteAddress;
    const cookies = new CookiesParser(req.headers.cookie);

    Server[req.method]({
      req,
      res,
      cookies,
      write: `<h1>Welcome</h1>Your IP: ${ip}`,
      end: `<pre>${JSON.stringify(cookies)}</pre>`,
      contentType: 'text/html',
      status: 200,
    });
  }

  makeRoutes() {
    this.files.forEach(item => {
      if (item.isFile() && item.name !== 'index.js') {
        const route = item.name.split('.').slice(0, -1).join('.');
        this.routes[`/${route}`] = require(`./${item.name}`);
      }
    });
  }
}

module.exports = { Routes };

