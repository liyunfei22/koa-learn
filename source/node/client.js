// const http = require('http');
// let options = {
//   hostname: 'www.baidu.com',
//   port: 80,
//   path: '/',
//   method: 'GET'
// }
// const req = http.request(options, (res) => {
//   console.log('状态吗:' + res.statusCode);
//   console.log('响应头:' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//       console.log('响应内容', chunk);
//   });
// })
// req.end()
const https = require('https');
const fs = require('fs');
const path = require('path');
const options = {
  hostname: 'code.visualstudio.com',
  port: 443,
  path: '/docs',
  method: 'GET'
}
const req = https.request(options, (res) => {
  res.setEncoding('utf8');
  let html = ''
  res.on('data', (chunk) => {
    console.log('doing...')
    html += chunk
  })
  res.on('end', () => {
    fs.writeFile(path.join(__dirname, 'vscode.html'), html, (err) => {
      if (err) {
        console.log(err)
      }
    })
  })
})
req.on('error', (e) => {
  console.error(`请求遇到问题: ${e}`);
})
req.end()