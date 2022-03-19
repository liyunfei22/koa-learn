console.log('hello word!')
import Koa from 'koa'
import logger from './logger'
const app = new Koa ();
app.use(logger())
app.use(async (ctx)=> {
  ctx.body = 'hello word!'
})
app.listen(3000)