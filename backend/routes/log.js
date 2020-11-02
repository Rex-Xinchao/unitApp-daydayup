/* 
  Log Controller
  @author rex.sun
  @date 2020/10/30
*/
const express = require('express')
const router = express.Router()
const logService = require('../service/log')
const utils = require('../lib/utils')
const errorMsg = require('../lib/errorMsg')

router.get('/list', (req, res) => {
  req.query.size = req.query.size ? Number(req.query.size) : 10
  req.query.page = req.query.page ? Number(req.query.page) : 1
  const userId = req.cookies.daydayup_userId
  req.query.userId = Number(userId)
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else {
    logService.list(req, res)
  }
})

router.post('/add', (req, res) => {
  const checkFields = ['name', 'type', 'optType', 'point']
  const userId = req.cookies.daydayup_userId
  req.body.userId = Number(userId)
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    logService.add(req, res)
  }
})

module.exports = router
