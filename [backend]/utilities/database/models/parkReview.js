const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");



const ParkReviews = sequelize.define('ParkReviews', {
    body:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:true
        }
    },
    date:DataTypes.DATE,
    ParkId:{
        type:DataTypes.UUID,
        references:{
            model:'Parks',
            key:'id'
        }
    },
    UserId:{
        type:DataTypes.UUID,
        references:{
            model:'Users',
            key:'id'
        }
    }
})

module.exports = ParkReviews