module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        notificationId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('read', 'unread'),
            allowNull: false,
            defaultValue: 'unread'
        },
        snooze: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Notification.associate = (models) => {
        Notification.belongsTo(models.Client); 
    };

    return Notification;
};