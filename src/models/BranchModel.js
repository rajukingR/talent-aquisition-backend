export default (sequelize, DataTypes) => {
    const Branch = sequelize.define(
        "Branch",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            branch_id: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            branch_name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            pincode: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            state: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false
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
            tableName: "branch",
            timestamps: false
        }
    );

    return Branch;
};
