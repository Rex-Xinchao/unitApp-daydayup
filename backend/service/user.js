const userDao = require('../dao/user')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  register: async (req, res) => {
    const params = req.body
    const user = await userDao.getUserByName(params.username)
    if (user) {
      res.status(400).send(errorMsg(400101))
    } else {
      userDao.createUser(
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
    userDao.login(
      params,
      (user) => {
        if (user) {
          res.status(200).send({ code: 200, data: user })
        } else {
          res.status(400).send(errorMsg(400103))
        }
      },
      (err) => {
        res.status(400).send(errorMsg(400103, err))
      }
    )
  },
  edit: async (req, res) => {
    const params = req.body
    const user = await userDao.getUserByName(params.username)
    if (user && user.id !== params.userId) {
      res.status(400).send(errorMsg(400101))
    } else {
      userDao.updateUser(
        params,
        (dbRes) => {
          res.status(200).send({ code: 200, data: dbRes })
        },
        (err) => {
          res.status(400).send(errorMsg(400104, err))
        }
      )
    }
  },
  getUserInfo: async (req, res) => {
    const params = req.query
    const user = await userDao.getUserById(params.userId)
    if (!user) {
      res.status(400).send(errorMsg(400105))
    } else {
      res.status(200).send({ code: 200, data: user })
    }
  }
}
