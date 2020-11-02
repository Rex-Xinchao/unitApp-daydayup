/* 
  Ache Controller
  @author rex.sun
  @date 2020/10/30
*/
const express = require('express')
const router = express.Router()
const acheService = require('../service/ache')
const utils = require('../lib/utils')
const errorMsg = require('../lib/errorMsg')

router.get('/list', (req, res) => {
  const userId = req.cookies.daydayup_userId
  req.query.userId = Number(userId)
  req.query.type = req.query.type === 'all' ? null : req.query.type
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else {
    acheService.list(req, res)
  }
})

router.post('/finish', (req, res) => {
  const checkFields = ['acheId']
  const userId = req.cookies.daydayup_userId
  req.body.userId = Number(userId)
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    acheService.finish(req, res)
  }
})

module.exports = router
