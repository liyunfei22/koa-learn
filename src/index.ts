console.log('hello word!')
import koa from 'koa'
const app = new koa ();
app.use(async (ctx)=> {
  ctx.body = 'hello word!'
})
app.listen(3000)