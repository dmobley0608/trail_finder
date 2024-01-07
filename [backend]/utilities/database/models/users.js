const { DataTypes } = require("sequelize");
const { sequelize } = require("../../sequelize");
const Parks = require("./parks");
const ParkReviews = require("./parkReview");
const TrailReviews = require("./trailReview");
const Trails = require("./trails");



const Users = sequelize.define('Users', {
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,        
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            min:3
        }
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            notEmpty:true,
            min:3
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true,
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            min:8
        }
    },
    role:{
        type:DataTypes.ENUM('ADMIN', 'USER'),
        defaultValue:'USER'
    }
})

Users.hasMany(Parks, {onDelete:'SET NULL'})
Parks.belongsTo(Users)
Users.hasMany(ParkReviews, {onDelete:'CASCADE'})
ParkReviews.belongsTo(Users)
Users.hasMany(Trails, {onDelete:'SET NULL'})
Users.hasMany(TrailReviews, {onDelete:'CASCADE'})
TrailReviews.belongsTo(Users)

module.exports=Users