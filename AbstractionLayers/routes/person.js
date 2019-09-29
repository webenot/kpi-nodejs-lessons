'use strict';

const fs = require('fs');
const Cache = require('../cache').Cache;
const Server = require('../server').Server;
const config = require('../config');

const person = function(req, res) {
  // Reading person's data
  this.read = function(req, res) {
    fs.readFile('./person.json', (err, data) => {
      if (!err) {
        const obj = JSON.parse(data);
        obj.birth = new Date(obj.birth);
        const difference = new Date() - obj.birth;
        obj.age = Math.floor(difference / config.YEAR_MICROTIME);
        delete obj.birth;
        const sobj = JSON.stringify(obj);
        Cache.cache[req.url] = sobj;

        Server[req.method]({ req, res, end: sobj, status: 200 });
      } else {
        Server[req.method]({ req, res, end: 'Read error', status: 500 });
      }
    });
  };
  // Writing person's dataon POST request
  this.write = function(req, res) {
    const after = (data) => {
      let status, end = '';
      fs.writeFile('./person.json', data, err => {
        if (!err) {
          status = 200;
          end = 'File saved';
        } else {
          status = 500;
          end = 'Write error';
        }
      });
      return { status, end };
    };

    Server[req.method]({ req, res, after, });
  };
  if (req.method === 'GET') {
    this.read(req, res);
  } else if (req.method === 'POST') {
    this.write(req, res);
  }
};

module.exports = person;
