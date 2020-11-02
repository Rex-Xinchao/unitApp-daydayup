/* 
  User Service
  @author rex.sun
  @date 2020/10/29
*/
const userDao = require('../dao/user')
const errorMsg = require('../lib/errorMsg')
const utils = require('../lib/utils')
module.exports = {
  register: async (req, res) => {
    const params = req.body
    const user = await userDao.getByName(params.username)
    if (user) {
      res.status(400).send(errorMsg(400101))
    } else {
      userDao.create(
        params,
        (dbRes) => {
          res.status(200).send({ code: 200, data: dbRes })
        },
        (err) => {
          res.status(400).send(errorMsg(400102, err))
        }
      )
    }
  },
  login: async (req, res) => {
    const params = req.body
    params.password = utils.decrypt(params.password, req.session.key)
    const user = await userDao.getByNameAndPassword(params)
    if (user) {
      res.cookie(`daydayup_userId`, user.id, { maxAge: 3600 * 1000 })
      res.status(200).send({ code: 200, data: user })
    } else {
      res.status(400).send(errorMsg(400103))
    }
  },
  getInfo: async (req, res) => {
    const user = await userDao.getById(req.cookies.daydayup_userId)
    if (!user) {
      res.status(400).send(errorMsg(400105))
    } else {
      res.status(200).send({ code: 200, data: user })
    }
  },
  edit: async (req, res) => {
    const params = req.body
    const user = await userDao.getByName(params.username)
    if (user && user.id !== params.userId) {
      res.status(400).send(errorMsg(400101))
    } else {
      userDao.update(
        params,
        (dbRes) => {
          res.status(200).send({ code: 200, data: dbRes })
        },
        (err) => {
          res.status(400).send(errorMsg(400104, err))
        }
      )
    }
  }
}
