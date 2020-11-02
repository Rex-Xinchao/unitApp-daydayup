/* 
  Ache Service
  @author rex.sun
  @date 2020/10/30
*/
const acheDao = require('../dao/ache')
const logDao = require('../dao/log')
const userDao = require('../dao/user')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await acheDao.list(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  finish: async (req, res) => {
    acheDao.finish(
      req.body,
      async () => {
        let ache = await acheDao.getById(req.body.acheId)
        let user = await userDao.getById(req.body.userId)
        console.log(req.body.acheId)
        console.log(req.body.userId)
        console.log(ache)
        console.log(user)
        let point = Number(user.point) + Number(ache.point)
        let responeseMsg = ache
        let isError = false
        await userDao.setPoint(
          {
            userId: user.id,
            point: point
          },
          () => {},
          (err) => {
            isError = true
            responeseMsg = errorMsg(400201, err)
          }
        )
        await logDao.add(
          {
            ...ache,
            optType: 'add',
            type: 'ache'
          },
          () => {},
          (err) => {
            isError = true
            responeseMsg = errorMsg(400201, err)
          }
        )
        if (isError) {
          res.status(400).send(responeseMsg)
        } else {
          res.status(200).send({ code: 200, data: responeseMsg })
        }
      },
      (err) => {
        res.status(400).send(errorMsg(400301, err))
      }
    )
  }
}
