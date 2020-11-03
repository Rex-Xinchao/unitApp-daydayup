/* 
  Task Service
  @author rex.sun
  @date 2020/11/03
*/
const taskDao = require('../dao/task')
const logDao = require('../dao/log')
const userDao = require('../dao/user')
const errorMsg = require('../lib/errorMsg')
module.exports = {
  list: async (req, res) => {
    let result = await taskDao.list(req.query)
    res.status(200).send({ code: 200, data: result })
  },
  finish: async (req, res) => {
    let task = await taskDao.getById(req.body.id)
    let user = await userDao.getById(req.body.userId)
    if (task.current >= task.limit) {
      res.status(400).send(errorMsg(400502))
    } else {
      taskDao.finish(
        { ...task },
        async () => {
          let isError = false
          let responeseMsg = errorMsg(400501)
          let point = user.point + task.point
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
              ...task,
              optType: 'add',
              type: 'task',
              userId: req.body.userId
            },
            () => {},
            () => (isError = true)
          )
          if (isError) {
            res.status(400).send(responeseMsg)
          } else {
            res.status(200).send({ code: 200, data: task })
          }
        },
        (err) => {
          res.status(400).send(errorMsg(400501, err))
        }
      )
    }
  }
}
