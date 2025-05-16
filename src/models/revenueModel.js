export default (sequelize, DataTypes) => {
    const RevenueModel = sequelize.define("RevenueModel", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isInt: true
        }
      },
      revenue_model_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Revenue model name is required"
          },
          len: {
            args: [2, 255],
            msg: "Name must be between 2-255 characters"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: {
            args: [0, 2000],
            msg: "Description cannot exceed 2000 characters"
          }
        }
      },
      active_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
          isBoolean: true
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          const value = this.getDataValue('created_at');
          return value ? value.toISOString() : null;
        }
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
          const value = this.getDataValue('updated_at');
          return value ? value.toISOString() : null;
        }
      }
    }, {
      tableName: "revenue_models_v2",
      timestamps: false,
      underscored: true,
      hooks: {
        beforeUpdate: (instance) => {
          instance.updated_at = new Date();
        }
      },
      indexes: [
        {
          unique: true,
          fields: ['revenue_model_name']
        },
        {
          fields: ['active_status']
        }
      ],
      toJSON: {
        virtuals: false,
        transform: (doc, ret) => {
          // Ensure consistent ISO format in JSON output
          ret.created_at = ret.created_at ? new Date(ret.created_at).toISOString() : null;
          ret.updated_at = ret.updated_at ? new Date(ret.updated_at).toISOString() : null;
          return ret;
        }
      }
    });
  
    // Class methods
    RevenueModel.findActive = function() {
      return this.findAll({ where: { active_status: true } });
    };
  
    // Instance methods
    RevenueModel.prototype.deactivate = function() {
      return this.update({ active_status: false });
    };
  
    return RevenueModel;
  };