const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const Parks = require("./parks");
const { User } = require("./users");


const Trails = sequelize.define('Trails', {
    name:DataTypes.STRING,
    length:DataTypes.FLOAT,
    color:DataTypes.STRING,
    difficulty:DataTypes.ENUM('EASY','MODERATE', 'CHALLENGING', 'RIGOROUS' ),
    description:DataTypes.STRING,
    rating:{
        type:DataTypes.FLOAT,
        defaultValue:1,
        validate:{
            min:1,
            max:5
        }
    },
    parkId:{
        type:DataTypes.UUID,
        references:{
            model:Parks,
            key:'id'
        }
    },
    createdBy:{
        type:DataTypes.UUID,
        references:{
            model:User,
            key:'id'
        }
    }
})

module.exports = Trails 