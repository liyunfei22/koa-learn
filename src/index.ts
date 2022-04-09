console.log('hello word!')
import Koa from 'koa'
import Router from '@koa/router'
import logger from './logger'
const app = new Koa ();
const router = new Router();
router
  .get('/', async (ctx) => {
    ctx.body = 'hello world'
  })
  .get('/user', async (ctx) => {
    ctx.body = 'user'
  })
app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())

app.listen(3000)