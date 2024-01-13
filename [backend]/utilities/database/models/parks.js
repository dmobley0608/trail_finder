const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../sequelize');
const Trails = require('./trails');
const ParkReviews = require('./parkReview');




const Parks = sequelize.define('Parks', {   
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            min:4
        }
    },
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {           
            notEmpty: true
        }

    },
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    
    url: {
        type:DataTypes.STRING,
        allowNull:true,       
    },
    description:{
        type:DataTypes.STRING(1000),
        validate:{
            notEmpty:true
        }
    },
    parkingFee:DataTypes.FLOAT,
    horseFee:DataTypes.FLOAT,
    UserId: {
        type:DataTypes.UUID,
        references:{
            model:'Users',
            key:'id'
        }
    }
})

Parks.hasMany(Trails, {foreignKey:'ParkId',onDelete:'CASCADE'})
Parks.hasMany(ParkReviews, {foreignKey:'ParkId',onDelete:'CASCADE'})
Trails.belongsTo(Parks,{foreignKey:'ParkId',})
ParkReviews.belongsTo(Parks, {foreignKey:'ParkId',})
module.exports = Parks 