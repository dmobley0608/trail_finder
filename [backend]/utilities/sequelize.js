const {Sequelize} = require('sequelize')




const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING,{   
    logging: false,   
    dialect:'postgres' 
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