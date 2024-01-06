const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");



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
    ParkId:{
        type:DataTypes.UUID,
        references:{
            model:'Parks',
            key:'id'
        }
    },
    createdBy:{
        type:DataTypes.UUID,
        references:{
            model:'Users',
            key:'id'
        }
    }
})

module.exports = Trails 