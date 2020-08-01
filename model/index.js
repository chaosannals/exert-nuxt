const { Sequelize } = require('sequelize')
export const sequelize = new Sequelize('t_test', 'root', 'root', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
})
