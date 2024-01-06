const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../sequelize');
const { User } = require('./users');
const Trails = require('./trails');


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
            len: [4, 13],
            notEmpty: true
        }

    },
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    rating:{
        type:DataTypes.FLOAT,
        defaultValue:1,
        validate:{
            min:1,
            max:5
        }
    },
    url: {
        type:DataTypes.STRING,
        validate:{
            isUrl:true
        }
    },
    description:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:true
        }
    },
    createdBy: {
        type:DataTypes.UUID,
        references:{
            model:User,
            key:'id'
        }
    }
})
Parks.hasMany(Trails)
module.exports = Parks 