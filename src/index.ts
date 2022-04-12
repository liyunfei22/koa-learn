console.log('hello word!')
import Koa from 'koa'
import Router from '@koa/router'
import logger from './logger'
import bodyParser from 'koa-bodyparser'
const app = new Koa ();
const router = new Router();
app.use(bodyParser())
router
  .get('/user', async (ctx) => {
    const query = ctx.query;
    ctx.body = query
  })
  .post('/user', async (ctx) => {
    console.log(ctx.request.body)
    ctx.body = ctx.request.body;
  })
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())

app.listen(3003)