const db = require('../lib/db')
const utils = require('../lib/utils')
const logModel = require('./log')
const findUserById = (params) => {
  let query = {
    sql: `SELECT * FROM user where id = ?`,
    timeout: 4000,
    values: [params.userId]
  }
  return db.row(query).then(
    (dbRes) => dbRes,
    (err) => err
  )
}

const findUserByName = (params) => {
  let query = {
    sql: `SELECT * FROM user where username = ?`,
    timeout: 4000,
    values: [params.username]
  }
  return db.row(query).then(
    (dbRes) => dbRes,
    (err) => err
  )
}

module.exports = {
  register: async (params, res, rej) => {
    let user = await findUserByName(params)
    user = utils.underlineToCamelCase(user)[0]
    if (user) {
      rej('用户名称已存在')
    } else {
      let query = {
        sql: 'INSERT INTO user(username, password, point) VALUE (? ,?, ?)',
        timeout: 4000,
        values: [params.username, params.password, 0]
      }
      db.row(query).then(
        async (dbRes) => {
          let user = await findUserByName(params)
          user = utils.underlineToCamelCase(user)[0]
          res(user)
        },
        (err) => rej(err)
      )
    }
  },
  login: (params, res, rej) => {
    let query = {
      sql: `SELECT * FROM user where username = ? and password = ?`,
      timeout: 4000,
      values: [params.username, params.password]
    }
    db.row(query).then(
      (dbRes) => {
        if (utils.underlineToCamelCase(dbRes)[0]) {
          res(utils.underlineToCamelCase(dbRes)[0])
        } else {
          rej('用户名或密码错误')
        }
      },
      (err) => rej('用户名或密码错误')
    )
  },
  edit: async (params, res, rej) => {
    let user = await findUserByName(params)
    user = utils.underlineToCamelCase(user)[0]
    if (user && user.id !== params.userId) {
      rej('用户名称已存在')
    } else {
      let query = {
        sql: 'UPDATE user SET username = ?,password = ?,email = ?,mobile = ? WHERE id = ?',
        timeout: 4000,
        values: [params.username, params.password, params.email, params.mobile, params.userId]
      }
      db.row(query).then(
        async (dbRes) => {
          let user = await findUserByName(params)
          user = utils.underlineToCamelCase(user)[0]
          res(user)
        },
        (err) => rej(err)
      )
    }
  },
  getInfo: async (params, res, rej) => {
    let user = await findUserById(params)
    user = utils.underlineToCamelCase(user)[0]
    if (user) {
      res(user)
    } else {
      rej('用户不存在')
    }
  },
  setPoint: async (params, res, rej) => {
    let user = await findUserById(params)
    user = utils.underlineToCamelCase(user)[0]
    let point = user.point
    if (params.calc === 'add') {
      point = Number(point) + Number(params.point)
    } else {
      point = Number(point) - Number(params.point)
      if (point < 0) {
        rej('点数不足')
        return
      }
    }
    let query = {
      sql: 'UPDATE user SET point = ? WHERE id = ?',
      timeout: 4000,
      values: [point, params.userId]
    }
    db.row(query).then(
      (dbRes) => {
        logModel.addLog(
          params,
          (dbRes) => res({ point: point }),
          (err) => rej(err)
        )
      },
      (err) => rej(err)
    )
  }
}
