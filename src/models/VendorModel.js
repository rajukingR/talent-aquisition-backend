export default (sequelize, DataTypes) => {
    const Vendor = sequelize.define(
        "Vendor",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            vendor_id: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            vendor_name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            vendor_owner: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            contact_name: {
                type: DataTypes.STRING(255)
            },
            website: {
                type: DataTypes.STRING(255)
            },
            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            address_line1: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            pin_code: {
                type: DataTypes.STRING(20),
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
            comments: {
                type: DataTypes.TEXT
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
            tableName: "vendors", 
            timestamps: false
        }
    );

    return Vendor;
};
