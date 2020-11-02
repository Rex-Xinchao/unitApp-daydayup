'use strict'
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 50,
  host: '121.36.201.82',
  port: '3306',
  user: 'root',
  password: 'Xinchao3948',
  database: 'daydayup'
})

//将结果已对象数组返回
const row = (sql) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, function (error, results) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(results)
      })
    })
  })
}

//模块导出
module.exports = { row }
