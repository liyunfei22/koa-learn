console.log('hello word!')
import Koa from 'koa'
import Router from '@koa/router'
import logger from './logger'
import bodyParser from 'koa-bodyparser'
import query from './async-db'
async function getEmp() {
  let sql:string = 'SELECT * FROM emp'
  let dataList = await query(sql)
  return dataList
}
const app = new Koa ();
const router = new Router();
app.use(bodyParser())
router
  .get('/user', async (ctx) => {
    const query = ctx.query;
    ctx.body = query
  })
  .post('/user', async (ctx) => {
    const data = await getEmp()
    console.log(data)
    ctx.body = data
  })
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())

app.listen(3003)