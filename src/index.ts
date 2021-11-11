import fs from "fs";
import { DefaultContext, Next } from "koa";
const path = require("path");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Koa = require('koa')
const koaStatic = require('koa-static')
const views = require('koa-views')
const { query } = require('./async-db')


async function selectAllData( ) {
  let sql = 'SELECT * FROM class'
  let dataList = await query( sql )
  return dataList
}

async function getData() {
  let dataList = await selectAllData()
  console.log( dataList )
}
getData()

const app = new Koa();
// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '12345678',
//   database: 'test_db01'
// })
// connection.query('SELECT * FROM class', (error: any, _result: any, _fields: any) => {
//   if (error) throw error;
//   console.log(_result)
//   connection.release
// })

app.listen(3000)
console.log('starting at port 3000')
