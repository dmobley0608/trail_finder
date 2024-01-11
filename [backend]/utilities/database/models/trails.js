const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const TrailReviews = require("./trailReview");



const Trails = sequelize.define('Trails', {
    name:DataTypes.STRING,
    length:DataTypes.FLOAT,
    color:DataTypes.STRING,
    difficulty:DataTypes.STRING,
    description:DataTypes.STRING,
   
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

Trails.hasMany(TrailReviews, {foreignKey:'TrailId', onDelete:'CASCADE'})
TrailReviews.belongsTo(Trails)
module.exports = Trails 