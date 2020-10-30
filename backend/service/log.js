/* 
  Log Service
  @author rex.sun
  @date 2020/10/30
*/
const logDao = require('../dao/log')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await logDao.getLogList(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  add: async (req, res) => {
    logDao.addLog(
      req.body,
      (dbRes) => {
        res.status(200).send({ code: 200, data: dbRes })
      },
      (err) => {
        res.status(400).send(errorMsg(400201, err))
      }
    )
  }
}
