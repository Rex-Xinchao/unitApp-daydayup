/* 
  User Controller
  @author rex.sun
  @date 2020/10/29
*/
const express = require('express')
const router = express.Router()
const utils = require('../lib/utils')
const errorMsg = require('../lib/errorMsg')
const userService = require('../service/user')

// 注册
router.post('/register', (req, res) => {
  const checkFields = ['username', 'username']
  if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    userService.register(req, res)
  }
})
// 获取秘钥
router.get('/key', (req, res) => {
  req.session.key = utils.getRandomString()
  res.status(200).send({ code: 200, data: req.session.key })
})
// 登录
router.post('/login', (req, res) => {
  const checkFields = ['username', 'username']
  if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    userService.login(req, res)
  }
})
// 获取用户信息
router.get('/info', (req, res) => {
  const userId = req.cookies.daydayup_userId
  req.query.userId = Number(userId)
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else {
    userService.getInfo(req, res)
  }
})
// 编辑
router.post('/edit', (req, res) => {
  const checkFields = ['userId', 'username']
  const userId = req.cookies.daydayup_userId
  req.body.userId = Number(userId)
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    userService.edit(req, res)
  }
})

module.exports = router
