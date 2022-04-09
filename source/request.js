const url = require('url')
module.exports = {
   /* 查看这两步操作
    * const request = ctx.request = Object.create(this.request)
    * ctx.req = request.req = response.req = req 
    * 
    * 此时的 this 是指向 ctx，所以这里的 this.req 访问的是原生属性 req
    * 同样，也可以通过 this.request.req 来访问
    */
   // 请求的 query 参数
   get query() {
     return url.parse(this.req.url).query
   },
   // 请求的路径
   get path() {
     return url.parse(this.req.url).pathname
   },
   // 请求的方法
   get method() {
     return this.req.method.toLowerCase()
   }
}