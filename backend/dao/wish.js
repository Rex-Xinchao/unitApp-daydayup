/* 
  Wish Dao
  @author rex.sun
  @date 2020/11/02
*/
const db = require('../lib/db')
const Wish = require('../entity/wish')
const TIMEOUT = 4000
const getWish = (obj) => {
  if (!obj) return null
  return new Wish(obj).toObject()
}
const getWishList = (list) => {
  if (!list) return []
  if (!list.length) return []
  return list.map((item) => new Wish(item).toObject())
}

module.exports = {
  getById: function (id) {
    const query = {
      sql: `SELECT * FROM wish where id = ?`,
      timeout: TIMEOUT,
      values: [id]
    }
    return db.row(query).then(
      (dbRes) => getWish(dbRes[0]),
      () => null
    )
  },
  getTotal: function (userId) {
    const query = {
      sql: `SELECT COUNT(*) AS TOTAL FROM wish where userId = ?`,
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
      sql: `SELECT * FROM wish where userId = ? ORDER BY id LIMIT ? OFFSET ?`,
      timeout: TIMEOUT,
      values: [userId, size, (page - 1) * size]
    }
    return db.row(query).then(
      async (dbRes) => {
        let total = await this.getTotal(userId)
        return {
          list: getWishList(dbRes),
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
