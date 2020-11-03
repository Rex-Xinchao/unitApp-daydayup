/* 
  Task Dao
  @author rex.sun
  @date 2020/11/02
*/
const db = require('../lib/db')
const Task = require('../entity/task')
const TIMEOUT = 4000
const getTask = (obj) => {
  if (!obj) return null
  return new Task(obj).toObject()
}
const getTaskList = (list) => {
  if (!list) return []
  if (!list.length) return []
  return list.map((item) => new Task(item).toObject())
}

module.exports = {
  getById: function (id) {
    const query = {
      sql: `SELECT * FROM task where id = ?`,
      timeout: TIMEOUT,
      values: [id]
    }
    return db.row(query).then(
      (dbRes) => getTask(dbRes[0]),
      () => null
    )
  },
  getTotal: function (userId) {
    const query = {
      sql: `SELECT COUNT(*) AS TOTAL FROM task where userId = ?`,
      timeout: TIMEOUT,
      values: [userId]
    }
    return db.row(query).then(
      (dbRes) => dbRes[0]['TOTAL'],
      () => 0
    )
  },
  list: function ({ userId }) {
    const query = {
      sql: `SELECT * FROM task where userId = ? ORDER BY id`,
      timeout: TIMEOUT,
      values: [userId]
    }
    return db.row(query).then(
      async (dbRes) => {
        let total = await this.getTotal(userId)
        return {
          list: getTaskList(dbRes),
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
  finish: function ({ id, current }, success, fail) {
    current += 1
    const query = {
      sql: `UPDATE task SET current = ? WHERE id = ?`,
      timeout: TIMEOUT,
      values: [current, id]
    }
    return db.row(query).then(
      (dbRes) => success(dbRes),
      (err) => fail(err)
    )
  },
  resetTaskCurrent: function (timely, success, fail) {
    let query = {
      sql: 'UPDATE task SET current = 0 WHERE timely = ?',
      timeout: 4000,
      values: [timely]
    }
    db.row(query).then(
      (dbRes) => success(dbRes),
      (err) => fail(err)
    )
  }
}
