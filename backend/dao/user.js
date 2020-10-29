const db = require('../lib/db')
const User = require('../entity/user')
const TIMEOUT = 4000
const getUser = (obj) => {
  if (!obj) return null
  return new User(obj).toObject()
}
const getUserList = (list) => {
  if (!list) return []
  if (!list.length) return []
  return list.map((item) => new User(item).toObject())
}

module.exports = {
  getUserById: function (userId) {
    const query = {
      sql: `SELECT * FROM user where id = ?`,
      timeout: TIMEOUT,
      values: [userId]
    }
    return db.row(query).then(
      (dbRes) => getUser(dbRes[0]),
      () => null
    )
  },
  getUserByName: function (username) {
    const query = {
      sql: `SELECT * FROM user where username = ?`,
      timeout: TIMEOUT,
      values: [username]
    }
    return db.row(query).then(
      (dbRes) => getUser(dbRes[0]),
      () => null
    )
  },
  login: function ({ username, password }, success, fail) {
    const query = {
      sql: `SELECT * FROM user where username = ? and password = ?`,
      timeout: TIMEOUT,
      values: [username, password]
    }
    return db.row(query).then(
      (dbRes) => success(getUser(dbRes[0])),
      (err) => fail(err)
    )
  },
  createUser: function ({ username, password }, success, fail) {
    const query = {
      sql: 'INSERT INTO user(username, password) VALUE (? ,?)',
      timeout: TIMEOUT,
      values: [username, password]
    }
    return db.row(query).then(
      async (dbRes) => {
        const user = await this.getUserById(dbRes.insertId)
        success(user)
      },
      (err) => fail(err)
    )
  },
  updateUser: function ({ userId, username, password, email, mobile }, success, fail) {
    let query = {
      sql: `UPDATE user SET username = ?${password ? ',password = ?' : ''},email = ?,mobile = ? WHERE id = ?`,
      timeout: TIMEOUT,
      values: password ? [username, password, email, mobile, userId] : [username, email, mobile, userId]
    }
    return db.row(query).then(
      async (dbRes) => {
        const user = await this.getUserById(userId)
        success(user)
      },
      (err) => fail(err)
    )
  }
}
