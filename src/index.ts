import fs from "fs";
import { DefaultContext, Next } from "koa";
const path = require("path");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Koa = require('koa')

const app = new Koa();
app.use(bodyParser())
app.use(async (ctx:DefaultContext) => {
  // let url = ctx.url;
  // let request = ctx.request;
  // let req_query = request.query;
  // let req_querystring = request.querystring;
  // ctx.body = {
  //   url,
  //   req_query,
  //   req_querystring,
  // }
  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    // let postData = await parsePostData( ctx )
    let postData = ctx.request.body

    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})
function parsePostData(ctx:DefaultContext) {
  return new Promise((resolve, reject) => {
    try { 
      let postdata = "";
      ctx.req.addListener('data', (data: string) => {
        postdata += data
      })
      ctx.req.addListener('end', () =>{
        let parseData = parseQueryStr(postdata)
        resolve(parseData)
      })
    } catch (err) {

    }
  })
}
function parseQueryStr(queryStr: string) {
  let queryData: {
    [x:string]:string
  } = {}
  let queryStrList = queryStr.split('&');
  console.log(queryStrList)
  for(let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=');
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}
app.listen(3000)
console.log('starting at port 3000')
