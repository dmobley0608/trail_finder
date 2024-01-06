const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");



const TrailReview = sequelize.define('TrailReview', {
    body:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:true
        }
    },
    trailId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Trails',
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

module.exports = TrailReview