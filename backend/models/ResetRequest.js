module.exports = (sequelize, DataTypes) => {
    const ResetRequest = sequelize.define('ResetRequest', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    ResetRequest.associate = (models) => {
        ResetRequest.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return ResetRequest;
};