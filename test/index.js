const Crawler = require('../lib/index.js')

const link = 'https://github.com/codelint/crawler4js'
new Crawler({
  interval: 2000,
  executablePath: 'chromium.app/Contents/MacOS/Chromium',
  shouldVisit(url) {
    return url.startsWith(link)
  },
  visit({ document, url }) {
    console.log(`${document.title} - ${url}`)
  },
  onError(error) {
    console.log(error.message)
  }
}).start(link)
