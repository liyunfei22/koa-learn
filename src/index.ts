import fs from "fs";
import { DefaultContext, Next } from "koa";
const path = require("path");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa();
app.use(bodyParser())
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(koaStatic(
  path.join( __dirname,  staticPath)
))
app.use( async ( ctx:DefaultContext ) => {
  ctx.body = 'hello world'
})

app.listen(3000)
console.log('starting at port 3000')
