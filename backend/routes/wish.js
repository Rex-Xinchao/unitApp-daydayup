/* 
  Wish Controller
  @author rex.sun
  @date 2020/11/02
*/
const express = require('express')
const router = express.Router()
const wishService = require('../service/wish')
const utils = require('../lib/utils')
const errorMsg = require('../lib/errorMsg')

router.get('/list', (req, res, next) => {
  const userId = req.cookies.daydayup_userId
  req.query.userId = userId
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else {
    wishService.list(req, res)
  }
})

router.post('/finish', (req, res, next) => {
  const checkFields = ['id']
  if (!userId) {
    res.status(400).send(errorMsg(400110))
  } else if (utils.checkParams(req.body, checkFields)) {
    res.status(400).send(errorMsg(400001, checkFields))
  } else {
    acheService.finish(req, res)
  }
})

module.exports = router
