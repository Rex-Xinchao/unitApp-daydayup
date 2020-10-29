const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isEmail = (str) => {
  let reg = /^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/
  return reg.test(str)
}

const isMobile = (str) => {
  let reg = /^1[3-9]\d{9}$/
  return reg.test(str)
}

module.exports = {
  formatTime,
  isEmail,
  isMobile
}
