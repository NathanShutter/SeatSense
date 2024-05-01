module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        clientId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seatedDuration: {
            type: DataTypes.TIME,
            allowNull: false
        },
        seatedThreshold: {
            type: DataTypes.TIME,
            allowNull: false
        }
    });

    Client.associate = (models) => {
        Client.belongsTo(models.User, { 
            foreignKey: {
                allowNull: true
            }
        });
        Client.hasMany(models.Notification);
    };

    return Client;
};