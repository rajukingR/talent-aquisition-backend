export default (sequelize, DataTypes) => {
    const Role = sequelize.define(
      "Role",
      {
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
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        department: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        active_status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "roles",
        timestamps: false, 
      }
    );
  
    return Role;
  };
  