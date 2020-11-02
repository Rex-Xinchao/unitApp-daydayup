/* 
  Wish Dao
  @author rex.sun
  @date 2020/11/02
*/
const db = require('../lib/db')
const TIMEOUT = 4000

module.exports = {
  getById: function (id) {
    const query = {
      sql: `SELECT * FROM wish where id = ?`,
      timeout: TIMEOUT,
      values: [id]
    }
    return db.row(query).then(
      (dbRes) => dbRes[0],
      () => null
    )
  },
  getList: function ({ userId, type }) {
    const query = {
      sql: `SELECT * FROM wish where userId = ?`,
      timeout: TIMEOUT,
      values: [userId]
    }
    return db.row(query).then(
      (dbRes) => {
        return dbRes
      },
      () => []
    )
  },
  finish: function ({ id, time }, success, fail) {
    time += 1
    const query = {
      sql: `UPDATE wish SET time = ? WHERE id = ?`,
      timeout: TIMEOUT,
      values: [time, id]
    }
    return db.row(query).then(
      (dbRes) => success(dbRes),
      (err) => fail(err)
    )
  }
}
