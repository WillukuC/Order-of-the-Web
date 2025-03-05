module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                is: /^[a-zA-Z0-9]+[a-zA-Z0-9_-]*[a-zA-Z0-9]+$/
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 8,
            }
        },
        profile_picture: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Default to current timestamp
        },
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // Default to 0
        },
        comics_read: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // Default to 0
        },
        comics_rated: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // Default to 0
        },
        bio: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        private_profile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default to false
        },
        notifs_enabled_follow: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Default to true
        },
        notifs_enabled_reply: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Default to true
        },
        reading_goal_daily: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // Default to 0
        },
        reading_goal_monthly: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // Default to 0
        },
        reading_goal_yearly: {
            type: DataTypes.INTEGER,
            defaultValue: 0, // Default to 0
        },
        dark_mode: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default to false
        },
        role: {
            type: DataTypes.ENUM('user', 'editor', 'admin'),
            defaultValue: 'user', // Default to 'user'
        }
    }, {
        tableName: 'users', // Explicitly set the table name
        timestamps: false, // Disable Sequelize's default `createdAt` and `updatedAt` fields
    });

    return User;
};