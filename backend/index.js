const cron = require('node-cron')
const taskDao = require('./dao/task')
// 每天凌晨重置每日任务
cron.schedule('0 0 0 * * *', () => {
  taskDao.resetTaskCurrent(
    { type: 'daily' },
    () => {
      console.log('success1')
    },
    () => {
      console.log('fail')
    }
  )
})
// 每周1凌晨重置每周任务
cron.schedule('0 0 0 * * 1', () => {
  taskDao.resetTaskCurrent(
    { type: 'weekly' },
    () => {
      console.log('success2')
    },
    () => {
      console.log('fail')
    }
  )
})
// 每月1号凌晨重置每月任务
cron.schedule('0 0 0 1 * *', () => {
  taskDao.resetTaskCurrent(
    { type: 'monthly' },
    () => {
      console.log('success3')
    },
    () => {
      console.log('fail')
    }
  )
})
