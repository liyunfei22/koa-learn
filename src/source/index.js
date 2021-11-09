const Koa = require('./application')
const app = new Koa();
app.use(async (ctx) => {
  console.log(22)
  ctx.status = 200;
  ctx.body = {
    code: 1,
    message: 'ok',
    url: ctx.url
  }
})
app.listen(3003)