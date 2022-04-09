const net = require('net');
const HOST = '127.0.0.1'
const PORT = 6969;
// 创建一个tcp服务实例
const server = net.createServer();
server.listen(PORT, HOST)
server.on('listening', () => {
  console.log(`服务已开启，地址：${HOST}:${PORT}`)
})
server.on('connection', (socket) => {
  socket.on('data', buffer => {
    const msg = buffer.toString()
    console.log(msg)
    socket.write(Buffer.from('你好'+ msg))
  })
  socket.on('end', () => {
    console.log('客户端已经关闭');
  })
});
server.on('close', () => {
  console.log('server close')
})
server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址正被使用，重试中...')
    server.close()
    server.listen(PORT, HOST)
  } else {
    console.error('服务异常')
  }
})
