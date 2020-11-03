/* 
  Wish Service
  @author rex.sun
  @date 2020/11/02
*/
const wishDao = require('../dao/wish')
const logDao = require('../dao/log')
const userDao = require('../dao/user')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await wishDao.list(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  finish: async (req, res) => {
    let wish = await wishDao.getById(req.body.id)
    let user = await userDao.getById(req.body.userId)
    if (user.point < wish.point) {
      res.status(400).send(errorMsg(400402))
    } else {
      wishDao.finish(
        { ...wish },
        async (dbRes) => {
          let isError = false
          let responeseMsg = errorMsg(400201)
          let point = user.point - wish.point
          wish.point = point
          await userDao.setPoint(
            {
              userId: user.id,
              point: point
            },
            () => {},
            () => (isError = true)
          )
          await logDao.add(
            {
              ...wish,
              optType: 'delete',
              type: 'wish',
              userId: req.body.userId
            },
            () => {},
            () => (isError = true)
          )
          if (isError) {
            res.status(400).send(responeseMsg)
          } else {
            res.status(200).send({ code: 200, data: wish })
          }
        },
        (err) => {
          res.status(400).send(errorMsg(400401, err))
        }
      )
    }
  }
}
