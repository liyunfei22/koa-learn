// const demo = {
//   _name: '',
//   get name () {
//     return this._name
//   },
//   set name (val) {
//     this._name = val
//   }
// }
class Demo {
  constructor() {
    this._name = '';
  }
  get name () {
    return this._name
  }
  set name(val) {
    this._name = val
  }
}
const demo = new Demo();
console.log(demo)
demo.name = 'liyf'
console.log(demo)
console.log(demo.name)