/* 
  Ache Dao
  @author rex.sun
  @date 2020/10/29
*/
const db = require('../lib/db')
const Achievement = require('../entity/ache')
const TIMEOUT = 4000
const getAche = (obj) => {
  if (!obj) return null
  return new Achievement(obj).toObject()
}
const getAcheList = (list) => {
  if (!list) return []
  if (!list.length) return []
  return list.map((item) => new Achievement(item).toObject())
}

module.exports = {
  getById: function (id) {
    const query = {
      sql: `SELECT * FROM achievement where id = ?`,
      timeout: TIMEOUT,
      values: [id]
    }
    return db.row(query).then(
      (dbRes) => getAche(dbRes[0]),
      () => null
    )
  },
  getTotal: function ({ userId, type }) {
    const query = {
      sql: `SELECT COUNT(*) AS TOTAL FROM achievement where userId = ? ${type ? 'and type = ?' : ''}`,
      timeout: TIMEOUT,
      values: [userId]
    }
    return db.row(query).then(
      (dbRes) => dbRes[0]['TOTAL'],
      () => 0
    )
  },
  list: function ({ userId, type }) {
    const query = {
      sql: `SELECT * FROM achievement where userId = ? ${type ? 'and type = ?' : ''}`,
      timeout: TIMEOUT,
      values: [userId, type]
    }
    return db.row(query).then(
      async (dbRes) => {
        let total = await this.getTotal(userId)
        return {
          list: getAcheList(dbRes),
          total: total
        }
      },
      () => {
        return {
          list: [],
          total: 0
        }
      }
    )
  },
  finish: function ({ acheId }, success, fail) {
    const query = {
      sql: `UPDATE achievement SET finished = 1 WHERE id = ?`,
      timeout: TIMEOUT,
      values: [acheId]
    }
    return db.row(query).then(
      (dbRes) => success(dbRes),
      (err) => fail(err)
    )
  }
}
