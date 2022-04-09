function compose(middleware) {
  return function (ctx) {
    return dispatch(0);
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
}
module.exports = compose
// function next1(ctx, next) {
//   console.log('1 start')
//   next()
//   console.log('1 end')
// }

// function next2(ctx, next) {
//   console.log('2 start')
//   next()
//   console.log('2 end')
// }

// function next3(ctx, next) {
//   console.log('3 start')
//   next()
//   console.log('3 end')
// }

// let ctx = {}
// let fn = compose([next1, next2, next3])
// fn(ctx)