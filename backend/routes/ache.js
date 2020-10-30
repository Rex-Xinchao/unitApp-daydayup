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

router.get('/list', (req, res, next) => {
  const checkFields = ['userId']
  if (!req.query.type || req.query.type === 'all') {
    req.query.type = null
  }
  if (utils.checkParams(req.query, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    acheService.list(req, res)
  }
})

router.post('/finish', (req, res, next) => {
  const checkFields = ['userId', 'acheId']
  if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    acheService.finish(req, res)
  }
})

module.exports = router
