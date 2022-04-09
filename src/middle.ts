import Koa from 'koa';
const app = new Koa();
// async 函数
app.use(async (ctx, next) => {
  await console.log(`第 1 个执行`);
  await next();
  await console.log(`第 8 个执行`);
});

// 第二层中间件
app.use(async (ctx, next) => {
  await console.log(`第 2 个执行`);
  await console.log(`第 3 个执行`);
  await next();
  await console.log(`第 6 个执行`);
  await console.log(`第 7 个执行`);
});

// 最里层的中间件
app.use(async (ctx, next) => {
  await console.log(`第 4 个执行`);
  ctx.body = "Hello world.";
  await console.log(`第 5 个执行`);
});
app.listen(3003)