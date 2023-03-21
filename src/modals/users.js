'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
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
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'users'
    });

    return users;
};