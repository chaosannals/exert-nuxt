const { Model, DataTypes } = require('sequelize')
const sequelize = require('./index')

class Tester extends Model { }
Tester.init({
  username: {
    type: DataTypes.STRING
  },
  enterDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Tester'
})
