const dns = require('dns')
// dns.lookup('dev.djtest.cn', (err, address, family) => {
//   console.log('地址: %j 地址族: IPv%s', address, family);
// })
dns.resolve('www.baidu.com', (err, record) => {
  console.log(record)
})