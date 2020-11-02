/* 
  Wish Service
  @author rex.sun
  @date 2020/11/02
*/
const wishDao = require('../dao/wish')
const logDao = require('../dao/log')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await wishDao.list(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  finish: async (req, res) => {
    wishDao.finish(
      req.body,
      async (dbRes) => {
        let wish = await wishDao.getById(req.body.id)
        logDao.add(
          {
            ...wish,
            optType: 'delete',
            type: 'wish',
            userId: req.body.userId
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
