class Log {
  constructor(obj) {
    this.id = obj.id
    this.type = obj.type
    this.name = obj.name
    this.point = obj.point
    this.finished = obj.finished
  }
  toObject() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      point: this.point,
      finished: this.finished
    }
  }
}
module.exports = Log
