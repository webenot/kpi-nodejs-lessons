'use strict';

const logger = (...data) => {
  const date = new Date().toISOString();
  console.log([date, ...data].join('  '));
};

module.exports = { logger };
