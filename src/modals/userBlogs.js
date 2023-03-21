'use strict';
module.exports = (sequelize, DataTypes) => {
    const userblogs = sequelize.define('userblogs', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        blogdetails: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    }, {
        timestamps: true,
        tableName: 'userblogs'
    });

    return userblogs;
};