module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('root', 'healthcare_professional'),
            allowNull: false,
            defaultValue: 'healthcare_professional'
        }
    });

    User.associate = (models) => {
        User.hasOne(models.Client, {
            foreignKey: {
                allowNull: false
            }
        });
        User.hasOne(models.ResetRequest, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return User;
};