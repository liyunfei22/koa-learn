const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const compose = require('./compose');
module.exports = class Coa {
  constructor() {
    this.middleware = []
    this.context = context
    this.request = request
    this.response = response
  }
  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    // 将中间件加入数组
    this.middleware.push(fn)
    return this
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
  callback() {
    const handleRequest = (req, res) => {
      // 创建上下文
      const ctx = this.createContext(req, res)
      // fn 为第一个应用中间件
      const fn = compose(this.middleware)
      return fn(ctx).then(() => respond(ctx)).catch(console.error)
    }
    return handleRequest
  }
  createContext(req, res) { 
    let ctx = Object.create(this.context)
    // 将扩展的 request、response 挂载到 ctx 上
    const request = ctx.request = Object.create(this.request)
    const response = ctx.response = Object.create(this.response)
    ctx.app = request.app = response.app = this;
    // 挂载原生属性
    ctx.req = request.req = response.req = req;
    ctx.res = request.res = response.res = res;
    request.ctx = response.ctx = ctx;
    request.response = response;
    response.request = request;
    ctx.req = req
    ctx.res = res
    return ctx
  }
}
function respond(ctx) {
  let res = ctx.res
  let body = ctx.body
  if (typeof body === 'string') {
    return res.end(body)
  }
  if (typeof body === 'object') {
    return res.end(JSON.stringify(body))
  }
}
