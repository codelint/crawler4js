const puppeteer = require('puppeteer')
const { JSDOM } = require('jsdom')

class Crawler4js {
  executablePath = '' // Chromium path
  urlList = []
  history = []
  interval = 0

  /**
   * 参数
   * @param options - object {
   *   executablePath:string,
   *   shouldVisit:function,
   *   visit:function
   * }
   */
  constructor(options = {}) {
    for (let key in options) {
      const option = options[key]
      if (key === 'executablePath' && !options[key]) {
        continue
      }
      this[key] = option
    }
  }

  shouldVisit = null

  visit = null

  onError(error) {
    console.error(error)
  }

  async getHrefs(page, selector) {
    return await page.$$eval(selector, anchors => [].map.call(anchors, a => a.href))
  }

  unique(arr) {
    const list = Array.from(new Set(arr))
    return list.filter(v => !this.history.includes(v) && this.shouldVisit(v))
  }

  async getHtmlContent(url) {
    const options = {
      args: ['--blink-settings=imagesEnabled=false']
    }
    if (this.executablePath) {
      options.executablePath = this.executablePath
    }

    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' }).catch(error => {
      this.onError(error)
    })
    const html = await page.content()
    const links = await this.getHrefs(page, 'a')
    this.urlList = this.unique(this.urlList.concat(links))
    await browser.close()
    const dom = new JSDOM(html)
    return { html, document: dom.window.document }

  }

  start(url) {
    if (typeof this.shouldVisit !== 'function') {
      console.error('You should implement shouldVisit method.')
      return
    }
    if (typeof this.visit !== 'function') {
      console.error('You should implement visit method.')
      return
    }
    if (this.shouldVisit(url)) {
      this.history.push(url)
      this.getHtmlContent(url).then(({ html, document }) => {
        this.visit({ html, document, url })
        const urlList = this.urlList
        setTimeout(() => {
          urlList.length && this.start(urlList.shift())
        }, this.interval)
      })
    } else {
      const urlList = this.urlList
      urlList.length && this.start(urlList.shift())
    }
  }
}

module.exports = Crawler4js
