import fs from "fs";
import { DefaultContext, Next } from "koa";
const path = require("path");
const Router = require("koa-router");
const Koa = require('koa')
const app = new Koa();
let home =  new Router();
let router = new Router()
home.get('/', async (ctx: DefaultContext) => {
  let html = `
  <ul>
    <li><a href="/page/helloworld">/page/helloworld</a></li>
    <li><a href="/page/404">/page/404</a></li>
  </ul>
`
ctx.body = html
})
router.use('/', home.routes(), home.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// app.listen(3001, () => {
//   console.log('[demo] route-use-middleware is starting at port 3000')
// })
// app.use(async function (ctx: DefaultContext, next: Next) {
//   console.log(ctx.method, ctx.header.host + ctx.url)
//   await next()
// })
// app.use(async (ctx:DefaultContext) => {
//   const url = ctx.request.url;
//   let html = await route(url)
//   console.log(html)
//   ctx.body = html
// })
// app.use(async (ctx: DefaultContext, next: Next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// })
// function render (page: string) {
//   return new Promise((resolve, reject) => {
//     let viewUrl = path.join(__dirname,`./view/${page}`)
//     fs.readFile(viewUrl, {encoding: 'utf8'}, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     })
//   })
// }
// async function route(url: string) {
//   let view = '404.html'
//   switch(url) {
//     case '/':
//       view = 'index.html'
//       break;
//     case '/index':
//       view = 'index.html'
//       break;
//     case 'todo':
//       view = 'todo.html'
//       break;
//     case '/404':
//       view = '404.html'
//       break;
//     default:
//       break;        
//   }
//   let html = await render(view)
//   return html;
// }
app.listen(3000)
console.log('starting at port 3000')
