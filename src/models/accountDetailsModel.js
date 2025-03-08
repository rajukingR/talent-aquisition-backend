export default (sequelize, DataTypes) => {
    const AccountDetails = sequelize.define(
        "AccountDetails",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            month: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            candidate_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            candidate_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            candidate_type: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            doj: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            title_designation: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            company: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            department: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            vertical_head: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            client: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            project_client_start_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            total_ctc: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            salary: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            professional_charges: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            billing_amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            gm_percentage: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            remarks: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            sub_department: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            revenue_mode: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            billable_non_billable: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            reporting_manager: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            po_end: {
                type: DataTypes.DATE,
                allowNull: false,
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
            tableName: "account_details",
            timestamps: false,
        }
    );

    return AccountDetails;
};
