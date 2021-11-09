module.exports = {
  get status () {
    return this.res.statusCode;
  },
  set status(code) {
    this.res.statusCode = code
  },
  get body () {
    return this._body;
  },
  set body(val) {
    this._body = val
  }
}