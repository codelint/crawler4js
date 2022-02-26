import WebCrawler from '../webCrawler/index.js'

class MyCrawler extends WebCrawler {
  shouldVisit(url) {
    return url.startsWith('https://www.baidu.com/')
  }

  visit({ document, html, url }) {
    // console.log(html)
    console.log(`${document.title} - ${url}`)
  }
}

const myCrawler = new MyCrawler()
myCrawler.start('https://www.baidu.com/')
