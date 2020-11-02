/* 
  Log Dao
  @author rex.sun
  @date 2020/10/29
*/
const db = require('../lib/db')
const Log = require('../entity/log')
const utils = require('../lib/utils')
const TIMEOUT = 4000
const getLog = (obj) => {
  if (!obj) return null
  return new Log(obj).toObject()
}
const getLogList = (list) => {
  if (!list) return []
  if (!list.length) return []
  return list.map((item) => new Log(item).toObject())
}

module.exports = {
  getById: function (id) {
    const query = {
      sql: `SELECT * FROM log where id = ?`,
      timeout: TIMEOUT,
      values: [id]
    }
    return db.row(query).then(
      (dbRes) => getLog(dbRes[0]),
      () => null
    )
  },
  getTotal: function (userId) {
    const query = {
      sql: `SELECT COUNT(*) AS TOTAL FROM log where userId = ?`,
      timeout: TIMEOUT,
      values: [userId]
    }
    return db.row(query).then(
      (dbRes) => dbRes[0]['TOTAL'],
      () => 0
    )
  },
  list: function ({ userId, size, page }) {
    const query = {
      sql: `SELECT * FROM log where userId = ? ORDER BY time DESC LIMIT ? OFFSET ?`,
      timeout: TIMEOUT,
      values: [userId, size, (page - 1) * size]
    }
    return db.row(query).then(
      async (dbRes) => {
        let total = await this.getTotal(userId)
        return {
          list: getLogList(dbRes),
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
  add: function ({ userId, name, type, optType, point }, success, fail) {
    let time = utils.getNowFormatDate()
    const query = {
      sql: `INSERT INTO log(userId,name,type,time,optType,point) VALUE (?,?,?,?,?,?)`,
      timeout: TIMEOUT,
      values: [userId, name, type, time, optType, point]
    }
    return db.row(query).then(
      async (dbRes) => {
        const log = await this.getById(dbRes.insertId)
        success(log)
      },
      (err) => fail(err)
    )
  }
}
