const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const { User } = require("./users");
const { Trail } = require("./trail");


const TrailReview = sequelize.define('TrailReview', {
    body:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:true
        }
    },
    trail:{
        references:{
            model:Trail,
            key:'id'
        }
    },
    createdBy:{
        references:{
            model:User,
            key:'id'
        }
    }
})

module.exports = {TrailReview}