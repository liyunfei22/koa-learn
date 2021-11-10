import fs from "fs";
import { DefaultContext, Next } from "koa";
const path = require("path");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa();
app.use(bodyParser())
app.use(async (ctx:DefaultContext) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('cid', 'hello world', {
      domain: 'localhost',
      path: 'index',
      maxAge: 10*60*10000,
      expires: new Date('2021-12-01'),
      httpOnly: false,
      overwrite: false
    });
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello word'
  }
})

app.listen(3000)
console.log('starting at port 3000')
