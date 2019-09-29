'use strict';

// Dependencies
const http = require('http');
const logger = require('./logger').logger;
const Routes = require('./routes').Routes;
const config = require('./config');
const Cache = require('./cache').Cache;
const Server = require('./server').Server;

// HTTP Server
http.createServer((req, res) => {

  // Logging
  logger(req.method, req.url);

  // Initialize routes
  const routes = new Routes(req, res);
  // Serve from cache
  if (Cache.cache[req.url]) {
    Server[req.method]({ req, res, status: 200, end: Cache.cache[req.url] });
  } else if (routes.routes[req.url]) {
    routes.routes[req.url](req, res);
  } else {
    // Route not found
    res.writeHead(404);
    res.end('Path not found');
  }
}).listen(config.port);
