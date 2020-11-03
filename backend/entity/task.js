class Task {
  constructor(obj) {
    this.id = obj.id
    this.type = obj.type
    this.name = obj.name
    this.point = obj.point
    this.current = obj.current
    this.limit = obj.limit
    this.timely = obj.timely
  }
  toObject() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      point: this.point,
      current: this.current,
      limit: this.limit,
      timely: this.timely
    }
  }
}
module.exports = Task
