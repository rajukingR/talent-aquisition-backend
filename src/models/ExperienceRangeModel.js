export default (sequelize, DataTypes) => {
    const ExperienceRange = sequelize.define(
        "ExperienceRange",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            experience_range: {
                type: DataTypes.STRING(50),
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
            tableName: "experience_range",
            timestamps: false
        }
    );

    return ExperienceRange;
};
