# crawler4js

安装

```bash
npm install codelint/crawler4js
```

调用

```javascript
// import url from 'url';
import Crawler from 'crawler4js'

let crawler = new Crawler({
  // optional, default is function(){return 2}
  "interval": function(){
    return 2
  },
  // optional, default is below
  // url/refUrl/seedUrl: http://nodejs.cn/api/url.html
  "shouldVisit": function(url, refUrl, seedUrl){
    return url.host == refUrl.host && url.host == seedUrl.host
  },
  // optional, default is function(){ console.log(url) }
  "visit": function(url, content, document, window, redirectUrl){
    
  }
}) 

```





