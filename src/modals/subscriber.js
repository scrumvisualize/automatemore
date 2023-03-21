'use strict';
module.exports = (sequelize, DataTypes) => {
    const subscriber = sequelize.define('subscriber', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        timestamps: true,
        tableName: 'subscriber'
    });

    return subscriber;
};