const net = require('net');
const client = net.createConnection({
  host: '127.0.0.1',
  port: 6969
})
client.on('connect', () => {
  client.write('node js')
})
client.on('data', buffer => {
  console.log(buffer.toString())
})
client.on('error', err => {
  console.error('服务器异常：', err);
});
client.on('close', err => {
  console.log('客户端链接断开！', err);
});
