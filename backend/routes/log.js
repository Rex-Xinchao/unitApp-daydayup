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

router.get('/list', (req, res, next) => {
  const checkFields = ['userId']
  req.query.size = req.query.size ? Number(req.query.size) : 10
  req.query.page = req.query.page ? Number(req.query.page) : 1
  if (utils.checkParams(req.query, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    logService.list(req, res)
  }
})

router.post('/add', (req, res, next) => {
  const checkFields = ['userId', 'name', 'type', 'optType', 'point']
  if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    logService.add(req, res)
  }
})

module.exports = router
