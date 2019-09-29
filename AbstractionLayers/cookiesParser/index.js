'use strict';

class CookiesParser {
  constructor(cookie = '') {
    this.cookies = this.parseCookies(cookie);
  }

  parseCookies(cookie = '') {
    const parsed = {};

    if (cookie && typeof cookie === 'string') {
      cookie.split(';').forEach(item => {
        const parts = item.split('=');
        parsed[(parts[0]).trim()] = (parts[1] || '').trim();
      });
    }

    return parsed;
  }

  toString() {
    let strCookies = '';
    for (const cookie in this.cookies) {
      if (Object.prototype.hasOwnProperty.call(this.cookies, cookie)) {
        strCookies += `${cookie}=${this.cookies[cookie]};`;
      }
    }

    return strCookies.slice(0, -1);
  }
}

module.exports = { CookiesParser };
