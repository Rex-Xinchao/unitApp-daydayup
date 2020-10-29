const express = require('express')
const router = express.Router()
const userModel = require('../model/user')
const utils = require('../lib/utils')
const errorMsg = require('../lib/errorMsg')

const userService = require('../service/user')

// 注册
router.post('/Register', (req, res) => {
  if (utils.checkParams(req.body, ['username', 'password'])) {
    res.status(400).send(errorMsg(400100))
  } else {
    userService.register(req, res)
  }
})
// 登录
router.post('/Login', (req, res) => {
  const params = req.body
  if (utils.checkParams(params, ['username', 'password'])) {
    res.status(400).send(errorMsg(400100))
  } else {
    userService.login(req, res)
  }
})
// 编辑
router.post('/Edit', (req, res) => {
  const params = req.body
  if (utils.checkParams(params, ['userId', 'username'])) {
    res.status(400).send(errorMsg(400100))
  } else {
    userService.edit(req, res)
  }
})
// 获取用户信息
router.get('/Info', (req, res) => {
  const params = req.query
  if (utils.checkParams(params, ['userId'])) {
    res.status(400).send(errorMsg(400110))
  } else {
    userService.getUserInfo(req, res)
  }
})

module.exports = router
