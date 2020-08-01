import mysql2 from 'mysql2';

class Database {
  constructor(pool) {
    this.pool = pool;
  }
  execute(sql, params) {
    return new Promise((resolve, reject) => {
      this.pool.execute(sql, params, (
        err,
        data,
        fields
      ) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            data: data.map(i => { return { ...i }; }),
            fields,
          })
        }
      });
    });
  }

  transact() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
          this.pool.releaseConnection(conn);
        }
      });
    });
  }
}

export default (context, inject) => {
  const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "t_test",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  context.$db = new Database(pool);
}
