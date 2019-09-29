'use strict';

class Cache {
  static constructor(key = '', data = '') {
    if (key) {
      Cache.cache[key] = data;
    }
  }

  toString() {
    const stringify = [];
    for (const key in Cache.cache) {
      if (Object.prototype.hasOwnProperty.call(Cache.cache, key)) {
        stringify.push(`${key} : ${Cache.cache[key]}`);
      }
    }
    return stringify.join('\n');
  }
}

Cache.cache = {};

module.exports = { Cache };
