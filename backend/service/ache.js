/* 
  Ache Service
  @author rex.sun
  @date 2020/10/30
*/
const acheDao = require('../dao/ache')
const logDao = require('../dao/log')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await acheDao.getList(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  finish: async (req, res) => {
    acheDao.finish(
      req.body,
      async (dbRes) => {
        let ache = await acheDao.getById(req.body.acheId)
        logDao.addLog(
          {
            ...ache,
            optType: 'add',
            type: 'ache'
          },
          (logDbRes) => {
            res.status(200).send({ code: 200, data: dbRes })
          },
          (err) => {
            res.status(400).send(errorMsg(400201, err))
          }
        )
      },
      (err) => {
        res.status(400).send(errorMsg(400301, err))
      }
    )
  }
}
