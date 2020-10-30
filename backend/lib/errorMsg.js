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
    return { code: 400105, data: data, msg: '添加日志失败' }
  },
  400202: '',
  400110: (data) => {
    return { code: 400110, data: data, msg: '用户未登录' }
  }
}

const errorMsg = (code, data = null) => {
  return errorMap[code](data)
}

module.exports = errorMsg
