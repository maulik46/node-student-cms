import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Attendence = sequelize.define("attendence", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "students",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    attendence: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "1 = Present, 0 = Absent",
    },
},
{
    tableName: "attendence",
    timestamps: false // This line disables createdAt and updatedAt columns
});

export default Attendence;