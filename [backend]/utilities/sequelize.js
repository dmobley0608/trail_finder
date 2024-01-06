const {Sequelize} = require('sequelize')
const path = require('path')



const sequelize = new Sequelize('postgres://admin:Thebigdawgisawesome!@localhost:5432/trail_finder',{   
    logging: false,
    
})

const connectToDatabase=async()=>{
    try {              
        await sequelize.authenticate();
        await sequelize.sync({alter:true})
        console.log('Connection to database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {sequelize, connectToDatabase} 