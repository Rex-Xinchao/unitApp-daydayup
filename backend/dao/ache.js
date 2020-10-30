/* 
  Ache Dao
  @author rex.sun
  @date 2020/10/29
*/
const db = require('../lib/db')
const utils = require('../lib/utils')
const TIMEOUT = 4000

module.exports = {
  getById: function (id) {
    const query = {
      sql: `SELECT * FROM achievement where id = ?`,
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
      sql: `SELECT * FROM achievement where userId = ? ${type ? 'and type = ?' : ''}`,
      timeout: TIMEOUT,
      values: [userId, type]
    }
    return db.row(query).then(
      (dbRes) => {
        return dbRes
      },
      () => []
    )
  },
  finish: function ({ acheId }, success, fail) {
    const query = {
      sql: `UPDATE achievement SET finished = ? WHERE id = ?`,
      timeout: TIMEOUT,
      values: [1, acheId]
    }
    return db.row(query).then(
      (dbRes) => success(dbRes),
      (err) => fail(err)
    )
  }
}
