module.exports = {
  // 这里的 this.res 也和上面同理 
  // 返回的状态码
  get status() {
    return this.res.statusCode
  },
  set status(val) {
    return this.res.statusCode = val
  },
  // 返回的输出内容
  get body() {
    return this._body
  },
  set body(val) {
    return this._body = val
  },
  // 设置头部
  set(filed, val) {
    if (typeof filed === 'string') {
      this.res.setHeader(filed, val)
    }
    if (toString.call(filed) === '[object Object]') {
      for (const key in filed) {
        this.set(key, filed[key])
      }
    }
  }
}