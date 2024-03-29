const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const TrailReviews = require("./trailReview");



const Trails = sequelize.define('Trails', {
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,      
        primaryKey:true,
        unique:true
    },
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