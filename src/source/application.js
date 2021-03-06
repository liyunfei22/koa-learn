const http = require('http');
class Application {
  constructor() {
    this.middleware = []; // 存储中间件
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn) {
    this.middleware.push(fn); // 存储中间件
  }

  compose (middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
    for (const fn of middleware) {
      if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }
  
    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */
  
    return function (context, next) {
      // last called middleware #
      let index = -1
      return dispatch(0)
      function dispatch (i) {
        if (i <= index) return Promise.reject(new Error('next() called multiple times'))
        index = i
        let fn = middleware[i]
        if (i === middleware.length) fn = next
        if (!fn) return Promise.resolve()
        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }
  

  callback() {
    // 合成所有中间件
    const fn = this.compose(this.middleware);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn)
    };

    return handleRequest;
  }

  handleRequest(ctx, fnMiddleware) {
    const handleResponse = () => respond(ctx);
    // 执行中间件并把最后的结果交给respond
    return fnMiddleware(ctx).then(handleResponse);
  }

  createContext(req, res) {
    // 针对每个请求，都要创建ctx对象
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    ctx.app = ctx.request.app = ctx.response.app = this;
    return ctx;
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
}

module.exports = Application;

function respond(ctx) {
  let content = ctx.body;
  if (typeof content === 'string') {
    ctx.res.end(content);
  }
  else if (typeof content === 'object') {
    ctx.res.end(JSON.stringify(content));
  }
}