'use strict';

// Dependencies
const Cache = require('../cache').Cache;

class Server {
  static GET(args) {
    const { req, res, cookies, write, end, contentType, status, before } = args;
    const headers = {};
    if (cookies) {
      headers['Set-Cookie'] = cookies;
    }
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    if (before && typeof before === 'function') {
      before(req, res);
    }
    res.writeHead(status, headers);

    if (write) res.write(write);
    res.end(end);
  }

  static POST(args) {
    const { req, res, end, status, after } = args;
    let result = null;

    // Receiving POST data
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      let data = Buffer.concat(body).toString();
      const obj = JSON.parse(data);
      if (obj.name) obj.name = obj.name.trim();
      data = JSON.stringify(obj);
      Cache.cache[req.url] = data;
      // Data processing
      if (after && typeof after === 'function') {
        result = after(data);
      }
    });
    if (result) {
      res.writeHead(result.status);
      res.end(result.end);
    } else {
      res.writeHead(status);
      res.end(end);
    }
  }
}

module.exports = { Server };
