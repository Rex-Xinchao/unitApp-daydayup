/* 
  Wish Service
  @author rex.sun
  @date 2020/11/02
*/
const wishDao = require('../dao/ache')
const logDao = require('../dao/log')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await wishDao.getList(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  finish: async (req, res) => {
    wishDao.finish(
      req.body,
      async (dbRes) => {
        let wish = await wishDao.getById(req.body.id)
        logDao.addLog(
          {
            ...wish,
            optType: 'delete',
            type: 'wish'
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
        res.status(400).send(errorMsg(400401, err))
      }
    )
  }
}
