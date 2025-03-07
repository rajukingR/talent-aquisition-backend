export default (sequelize, DataTypes) => {
    const Department = sequelize.define(
        "Department",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            department_name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            active_status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: "departments",
            timestamps: false
        }
    );

    return Department;
};
