const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");


const User = sequelize.define('User', {
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,        
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            min:3
        }
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            notEmpty:true,
            min:3
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            min:8
        }
    },
    role:{
        type:DataTypes.ENUM('ADMIN', 'USER'),
        defaultValue:'ADMIN'
    }
})

module.exports={User}