const WebCrawler = require('../lib/index.js')

class MyCrawler extends WebCrawler {
  shouldVisit(url) {
    return url.startsWith('https://github.com/codelint/crawler4js')
  }

  visit({ document, html, url }) {
    console.log(`${document.title} - ${url}`)
  }
}

const myCrawler = new MyCrawler({
  executablePath: 'chromium.app/Contents/MacOS/Chromium'
})
myCrawler.start('https://github.com/codelint/crawler4js')
