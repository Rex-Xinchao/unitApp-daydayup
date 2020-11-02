/* 
  User Dao
  @author rex.sun
  @date 2020/10/29
*/
const db = require('../lib/db')
const User = require('../entity/user')
const TIMEOUT = 4000
const getUser = (obj) => {
  if (!obj) return null
  return new User(obj).toObject()
}

module.exports = {
  getById: function (userId) {
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
  getByName: function (username) {
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
  getByNameAndPassword: function ({ username, password }) {
    const query = {
      sql: `SELECT * FROM user where username = ? and password = ?`,
      timeout: TIMEOUT,
      values: [username, password]
    }
    return db.row(query).then(
      (dbRes) => getUser(dbRes[0]),
      () => null
    )
  },
  create: function ({ username, password }, success, fail) {
    const query = {
      sql: 'INSERT INTO user(username, password) VALUE (? ,?)',
      timeout: TIMEOUT,
      values: [username, password]
    }
    return db.row(query).then(
      async (dbRes) => {
        const user = await this.getById(dbRes.insertId)
        success(user)
      },
      (err) => fail(err)
    )
  },
  update: function ({ userId, username, password, email, mobile }, success, fail) {
    let query = {
      sql: `UPDATE user SET username = ?${password ? ',password = ?' : ''},email = ?,mobile = ? WHERE id = ?`,
      timeout: TIMEOUT,
      values: password ? [username, password, email, mobile, userId] : [username, email, mobile, userId]
    }
    return db.row(query).then(
      async () => {
        const user = await this.getById(userId)
        success(user)
      },
      (err) => fail(err)
    )
  },
  setPoint: function ({ userId, point }, success, fail) {
    let query = {
      sql: `UPDATE user SET point = ? WHERE id = ?`,
      timeout: TIMEOUT,
      values: [point, userId]
    }
    return db.row(query).then(
      (dbRes) => success(dbRes),
      (err) => fail(err)
    )
  }
}
