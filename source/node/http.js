const http = require('http');
const fs = require('fs');
const path = require('path');
const HOST = '127.0.0.1'
const PORT = 6969;
// 创建一个http服务实例
const server = http.createServer(function (req, res) {
  const out = fs.createWriteStream(path.join(__dirname, 'request.log'))
  out.write('method=' + req.method + '\r\n');
  out.write('url=' + req.url + '\r\n');
  out.write('headers=' + JSON.stringify(req.headers) + '\r\n');
  out.write('httpVersion=' + req.httpVersion + '\r\n');
  res.write('hello ')
  res.end('world')
});
server.listen(PORT, HOST)
server.on('listening', () => {
  console.log(`服务已开启，地址：${HOST}:${PORT}`)
})
server.on('close', function () {
  console.log('服务器关闭');
});
server.on('error', function (err) {
  if (err.code == 'EADDRINUSE') {
    console.log('端口被占用')
  }
})
server.on('connection', () => {
  console.log('客户端已连接')
})