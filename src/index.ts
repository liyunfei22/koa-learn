import fs from "fs";
import { DefaultContext, Next } from "koa";
const path = require("path");
const Router = require("koa-router");
const Koa = require('koa')

const app = new Koa();
// const router = new Router();
// router.get('/', (ctx: DefaultContext, next: Next) => {
//   console.log(111)
//   ctx.body = 'hello world'
// }).get('/user', (ctx:DefaultContext, next:Next) => {
//   ctx.body = 'user'
// }).get('/user/:id', (ctx:DefaultContext, next:Next) => {
//   console.log(ctx._matchedRoute)
//   ctx.body = '1'
// })
// router.get('user', '/users/:id', (ctx:DefaultContext, next:Next) => {
//   console.log('sss')
//   ctx.body = '2'
//  });
//  router.get('/users:id', (ctx:DefaultContext, next:Next) => {
//    return User.findById(ctx.params.id).then(user => {
//      ctx.user = user;
//      next()
//    })
//  })
// router.url('user', 3);

// var forums = new Router();
// var posts = new Router();
// posts.get('/', (ctx:DefaultContext, next:Next) => {})
// posts.get('/:pid', (ctx:DefaultContext, next:Next) => {})
// console.log(posts.routes())
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods())

// app.use(router.routes())
//   .use(router.allowedMethods())
let home = new Router();
home.get('/b', async (ctx:DefaultContext, next:Next) =>{
  let html = 'hello word'
  ctx.body = html
})
let page = new Router();
page.get('/', async (ctx:DefaultContext, next:Next) =>{
  ctx.body = '404 page'
}).get('/helloword', async (ctx:DefaultContext, next:Next) =>{
  ctx.body = 'hello page'
})
let router = new Router();
router.redirect('/a/b', '/page/helloword')
router.use('/a', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods())
app.use(router.routes())
    .use(router.allowedMethods())
app.listen(3000)
console.log('starting at port 3000')
