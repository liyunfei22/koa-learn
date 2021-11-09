// function compose(fns) {
//   let length = fns.length;
//   let count = length - 1;
//   let resule = null;
//   return function fn1(...args) {
//     result = fns[count].apply(null, args);
//     if (count <= 0) {
//       return result;
//     }
//     count--;
//     return fn1(result);
//   }
// }
function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('middleware must be an array');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be composed of functions');
  }
  return function  a(context, next) {
    let index = -1;
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[index];
      if (i == middleware.lenght) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (e) {
        return Promise.reject(err)
      }
    }
  }
}
const context = {};

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

const test1 = async (context, next) => {
  console.log('1-start');
  context.age = 11;
  await next();
  console.log('1-end');
};

const test2 = async (context, next) => {
  console.log('2-start');
  context.name = 'deepred';
  await sleep(2000);
  console.log('2-end');
};
const test3 = async (context, next) => {
  console.log('3-start');
  context.name = 's3';
  await sleep(2000);
  console.log('3-end');
};

const fn = compose([test1, test2, test3]);

fn(context).then(() => {
  console.log('end');
  console.log(context);
});