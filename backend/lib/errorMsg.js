const errorMap = {
  400001: (fields) => {
    return { code: 400001, data: null, msg: `${fields.join(',')}不能为空` }
  },
  400101: (data) => {
    return { code: 400101, data: data, msg: '用户已存在' }
  },
  400102: (data) => {
    return { code: 400102, data: data, msg: '创建用户失败' }
  },
  400103: (data) => {
    return { code: 400103, data: data, msg: '用户名或密码错误' }
  },
  400104: (data) => {
    return { code: 400104, data: data, msg: '修改失败' }
  },
  400105: (data) => {
    return { code: 400105, data: data, msg: '用户不存在' }
  },
  400201: (data) => {
    return { code: 400201, data: data, msg: '添加日志失败' }
  },
  400301: (data) => {
    return { code: 400301, data: data, msg: '完成成就失败' }
  },
  400401: (data) => {
    return { code: 400401, data: data, msg: '完成愿望失败' }
  },
  400402: (data) => {
    return { code: 400402, data: data, msg: '积分不足' }
  },
  400501: (data) => {
    return { code: 400501, data: data, msg: '完成任务失败' }
  },
  400502: (data) => {
    return { code: 400501, data: data, msg: '任务次数已达上限' }
  },
  400110: (data) => {
    return { code: 400110, data: data, msg: '用户未登录' }
  }
}

const errorMsg = (code, data = null) => {
  return errorMap[code](data)
}

module.exports = errorMsg
