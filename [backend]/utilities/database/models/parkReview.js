const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const Park = require("./parks");
const { User } = require("./users");


const ParkReview = sequelize.define('ParkReview', {
    body:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:true
        }
    },
    park:{
        references:{
            model:Park,
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

module.exports = {ParkReview}