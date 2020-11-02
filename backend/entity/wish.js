class Wish {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.point = obj.point
    this.time = obj.time
  }
  toObject() {
    return {
      id: this.id,
      name: this.name,
      point: this.point,
      time: this.time
    }
  }
}
module.exports = Wish
