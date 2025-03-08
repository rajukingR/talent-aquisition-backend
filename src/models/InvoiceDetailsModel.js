export default (sequelize, DataTypes) => {
    const InvoiceDetails = sequelize.define(
        "InvoiceDetails",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            invoice_id: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            invoice_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            order_id: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            jd_ids: {
                type: DataTypes.STRING(255), // Storing multiple JD IDs as comma-separated values
                allowNull: false
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false
            },

            company_name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            contact_person: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: false
            },

            payment_type: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            tax_percentage: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            total_amount: {
                type: DataTypes.FLOAT,
                allowNull: false
            },

            pincode: {
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
            landmark: {
                type: DataTypes.STRING(255)
            },
            street: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            job_description: {
                type: DataTypes.JSON, // Storing multiple job descriptions as JSON
                allowNull: false
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
            tableName: "invoice_details",
            timestamps: false
        }
    );

    return InvoiceDetails;
};
