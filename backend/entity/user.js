class User {
  constructor(obj) {
    this.id = obj.id
    this.username = obj.username
    this.password = obj.password
    this.point = obj.point
    this.email = obj.email
    this.mobile = obj.mobile
  }
  edit(username, password, email, mobile) {
    this.username = username
    this.password = password
    this.email = email
    this.mobile = mobile
  }
  setPoint(point, type = 'add') {
    if (type === add) {
      this.point += point
    } else if (type === 'delete') {
      this.point -= point
    }
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
