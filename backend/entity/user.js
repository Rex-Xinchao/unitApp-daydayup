class User {
  constructor(obj) {
    this.id = obj.id
    this.username = obj.username
    this.password = obj.password
    this.point = obj.point
    this.email = obj.email
    this.mobile = obj.mobile
  }
  toObject() {
    return {
      id: this.id,
      username: this.username,
      point: this.point,
      email: this.email,
      mobile: this.mobile
    }
  }
}
module.exports = User
