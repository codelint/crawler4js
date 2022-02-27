'use strict';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const puppeteer = require('puppeteer');

const {
  JSDOM
} = require('jsdom');

class Crawler4js {
  // Chromium path
  constructor(options = {}) {
    _defineProperty(this, "executablePath", '');

    _defineProperty(this, "urlList", []);

    _defineProperty(this, "history", []);

    const {
      executablePath
    } = options;

    if (executablePath) {
      this.executablePath = executablePath;
    }
  }

  shouldVisit() {
    console.error('You should implement shouldVisit method.');
    return false;
  }

  visit() {
    console.error('You should implement visit method.');
  }

  async getHrefs(page, selector) {
    return await page.$$eval(selector, anchors => [].map.call(anchors, a => a.href));
  }

  unique(arr) {
    const list = Array.from(new Set(arr));
    return list.filter(v => !this.history.includes(v) && this.shouldVisit(v));
  }

  async getHtmlContent(url) {
    const options = {};

    if (this.executablePath) {
      options.executablePath = this.executablePath;
    }

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2'
    });
    const html = await page.content();
    const links = await this.getHrefs(page, 'a');
    this.urlList = this.unique(this.urlList.concat(links));
    await browser.close();
    const dom = new JSDOM(html);
    return {
      html,
      document: dom.window.document
    };
  }

  start(url) {
    if (this.shouldVisit(url)) {
      this.history.push(url);
      this.getHtmlContent(url).then(({
        html,
        document
      }) => {
        this.visit({
          html,
          document,
          url
        });
        const urlList = this.urlList;
        urlList.length && this.start(urlList.shift());
      });
    } else {
      const urlList = this.urlList;
      urlList.length && this.start(urlList.shift());
    }
  }

}

module.exports = Crawler4js;
