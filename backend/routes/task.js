/* 
  Task Controller
  @author rex.sun
  @date 2020/11/03
*/
const express = require('express')
const router = express.Router()
const taskService = require('../service/task')
const utils = require('../lib/utils')
const errorMsg = require('../lib/errorMsg')

router.get('/list', (req, res, next) => {
  const userId = req.cookies.daydayup_userId
  req.query.userId = Number(userId)
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else {
    taskService.list(req, res)
  }
})

router.post('/finish', (req, res, next) => {
  const checkFields = ['id']
  const userId = req.cookies.daydayup_userId
  req.body.userId = Number(userId)
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    taskService.finish(req, res)
  }
})

module.exports = router
