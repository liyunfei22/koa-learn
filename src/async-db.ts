const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'test_db01'
})
let query = function (sql: any, valuse: any) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err: any, connection: any) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, valuse, (err: any, rows: unknown) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
module.exports = {query}