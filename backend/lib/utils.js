// common
function getNowFormatDate() {
  let date = new Date()
  let year = date.getFullYear() // 年
  let month = date.getMonth() + 1 // 月
  let strDate = date.getDate() // 日
  let hour = date.getHours() // 时
  let minute = date.getMinutes() // 分
  let second = date.getMinutes() // 秒
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  const currentdate = year + '-' + month + '-' + strDate + ' ' + hour + ':' + minute + ':' + second
  return currentdate
}

function getRandomString(len = 16) {
  let res = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz0123456789'
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return res
}

function checkParams(params, list) {
  let emptyList = []
  list.length &&
    list.forEach((key) => {
      if (!params[key]) {
        emptyList.push(key)
      }
    })
  return emptyList.length > 0
}

function camelCase(string) {
  // Support: IE9-11+ 驼峰
  return string.replace(/_([a-z])/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

function underlineToCamelCase(item) {
  if (item === null) {
    return ''
  }
  if (typeof item === 'function') {
    return toQueryString(item())
  }
  item = JSON.stringify(item)
  item = JSON.parse(item)
  if (item instanceof Array) {
    let newItem = []
    item.forEach(function (element, index) {
      if (element instanceof Object) {
        newItem.push(underlineToCamelCase(element))
      } else {
        newItem.push(element)
      }
    })
    return newItem
  } else {
    let newItem = {}
    for (let key in item) {
      if (item[key] instanceof Array) {
        newItem[camelCase(key)] = underlineToCamelCase(item[key])
      }
      if (item[key] instanceof Object) {
        newItem[camelCase(key)] = underlineToCamelCase(item[key])
      } else {
        if (key.indexOf('time') > 0) {
          item[key] = dateTimeFormat(item[key], 'YYYY-MM-DD HH:mm:ss')
        }
        newItem[camelCase(key)] = item[key]
      }
    }
    return newItem
  }
}

module.exports = {
  getNowFormatDate,
  getRandomString,
  checkParams,
  underlineToCamelCase
}
