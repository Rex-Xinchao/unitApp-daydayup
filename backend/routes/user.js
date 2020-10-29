const express = require('express')
const router = express.Router()
const userModel = require('../model/user')
const utils = require('../lib/utils')

// 注册
router.post('/Register', (req, res) => {
  const params = req.body
  if (utils.checkParams(params, ['username', 'password'])) {
    res.status(400).send({ code: 400, data: null, msg: '用户名和密码不能为空' })
  } else {
    userModel.register(
      params,
      (dbRes) => {
        res.status(200).send({ code: 200, data: dbRes, msg: 'success' })
      },
      (err) => {
        res.status(400).send({ code: 400, data: null, msg: err })
      }
    )
  }
})
// 登录
router.post('/Login', (req, res) => {
  const params = req.body
  if (utils.checkParams(params, ['username', 'password'])) {
    res.status(400).send({ code: 400, data: null, msg: '用户名和密码不能为空' })
  } else {
    userModel.login(
      params,
      (dbRes) => {
        res.status(200).send({ code: 200, data: dbRes, msg: '登录成功' })
      },
      (err) => {
        res.status(400).send({ code: 400, data: null, msg: err })
      }
    )
  }
})
// 编辑
router.post('/Edit', (req, res) => {
  const params = req.body
  if (utils.checkParams(params, ['userId', 'username', 'password'])) {
    res.status(400).send({ code: 400, data: null, msg: '用户Id、用户名称和密码不能为空' })
  } else {
    userModel.edit(
      params,
      (dbRes) => {
        res.status(200).send({ code: 200, data: dbRes, msg: '修改成功' })
      },
      (err) => {
        res.status(400).send({ code: 400, data: null, msg: err })
      }
    )
  }
})
// 获取用户信息
router.get('/Info', (req, res) => {
  const params = req.query
  if (utils.checkParams(params, ['userId'])) {
    res.status(400).send({ code: 400, data: null, msg: 'userId不能为空' })
  } else {
    userModel.getInfo(
      params,
      (dbRes) => {
        res.status(200).send({ code: 200, data: dbRes, msg: 'success' })
      },
      (err) => {
        res.status(400).send({ code: 400, data: null, msg: err })
      }
    )
  }
})

module.exports = router
