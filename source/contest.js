// module.exports = {
//   get query() {
//     return this.request.query
//   }
// }
const proto = module.exports = {}

// getter代理
function delegateGetter(prop, name) {
  proto.__defineGetter__(name, function () {
    return this[prop][name]
  })
}
// setter代理
function delegateSetter(prop, name) {
  proto.__defineSetter__(name, function (val) {
    return this[prop][name] = val
  })
}
// 方法代理
function delegateMethod(prop, name) {
  proto[name] = function () {
    return this[prop][name].apply(this[prop], arguments)
  }
}

delegateGetter('request', 'query')
delegateGetter('request', 'path')
delegateGetter('request', 'method')

delegateGetter('response', 'status')
delegateSetter('response', 'status')
delegateGetter('response', 'body')
delegateSetter('response', 'body')
delegateMethod('response', 'set')