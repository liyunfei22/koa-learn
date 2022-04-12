import mysql from 'mysql'
// 创建数据池
const pool = mysql.createPool({
  host: '127.0.0.1',   // 数据库地址
  user: 'root',    // 数据库用户
  password: '12345678',   // 数据库密码
  database: 'test_db01'  // 选中数据库
})
const query = function (sql:string) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, (err, rows) => {

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
export default query