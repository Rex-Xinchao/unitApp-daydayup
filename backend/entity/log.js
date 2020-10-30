class Log {
  constructor(obj) {
    this.id = obj.id
    this.type = obj.type
    this.name = obj.name
    this.time = obj.time
    this.point = obj.point
    this.option = obj.option
  }
  toObject() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      time: this.time,
      point: this.point,
      option: this.option
    }
  }
}
module.exports = Log
