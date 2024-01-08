const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");



const TrailReviews = sequelize.define('TrailReviews', {
    body:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:true
        }
    },
    date:DataTypes.DATE,
    TrailId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Trails',
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

module.exports = TrailReviews