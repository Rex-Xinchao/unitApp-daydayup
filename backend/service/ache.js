/* 
  Ache Service
  @author rex.sun
  @date 2020/10/30
*/
const acheDao = require('../dao/ache')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await acheDao.getList(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  finish: async (req, res) => {
    acheDao.finish(
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
