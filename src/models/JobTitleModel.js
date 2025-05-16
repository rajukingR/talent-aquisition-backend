export default (sequelize, DataTypes) => {
  const Industry = sequelize.define("Industry", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    industry_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Industry name cannot be empty"
        },
        len: {
          args: [1, 255],
          msg: "Industry name must be between 1-255 characters"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 65535],
          msg: "Description too long"
        }
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      set(value) {
        this.setDataValue('is_active', !!value);
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Uses Sequelize's built-in 'NOW' for the default
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Uses Sequelize's built-in 'NOW' for the default
      onUpdate: DataTypes.NOW, // Automatically updates on modification
    }
  }, {
    tableName: "industries",
    timestamps: false, // Disable automatic Sequelize timestamps management
    underscored: true, // Converts camelCase to snake_case
  });

  return Industry;
};
