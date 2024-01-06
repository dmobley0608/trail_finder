const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../sequelize');


const Park = sequelize.define('Park', {
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
    url: {
        type:DataTypes.STRING,
        validate:{
            isUrl:true
        }
    }
})

module.exports = Park 