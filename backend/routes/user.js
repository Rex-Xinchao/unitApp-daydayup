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
router.post('/Register', (req, res) => {
  const checkFields = ['username', 'username']
  if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    userService.register(req, res)
  }
})
// 获取秘钥
router.get('/Key', (req, res) => {
  req.session.key = utils.getRandomString()
  res.status(200).send({ code: 200, data: req.session.key })
})
// 登录
router.post('/Login', (req, res) => {
  const checkFields = ['username', 'username']
  if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    userService.login(req, res)
  }
})
// 获取用户信息
router.get('/Info', (req, res) => {
  const checkFields = ['userId']
  if (utils.checkParams(req.query, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    userService.getUserInfo(req, res)
  }
})
// 编辑
router.post('/Edit', (req, res) => {
  const checkFields = ['userId', 'username']
  if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    userService.edit(req, res)
  }
})

module.exports = router
