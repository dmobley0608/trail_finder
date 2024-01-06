const {Sequelize} = require('sequelize')
const path = require('path')


const DB_PATH = path.join(__dirname, 'database','trails.db')
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:DB_PATH,
    logging: false,
    alter:true
})

const connectToDatabase=async()=>{
    try {              
        await sequelize.authenticate();
        await sequelize.sync()
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {sequelize, connectToDatabase} 