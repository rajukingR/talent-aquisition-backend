export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allow NULL to prevent constraint issues
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      tableName: 'users',
      timestamps: false,
    });
  
    return User;
  };
  