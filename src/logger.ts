import {Context} from 'koa'
function log( ctx:Context ) {
  console.log( ctx.method, ctx.header.host + ctx.url )
}

 export  default function () {
return async function ( ctx:Context, next: () => Promise<any> ) {
  log(ctx);
  await next()
}
}