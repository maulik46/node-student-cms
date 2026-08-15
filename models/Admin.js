import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Admin = sequelize.define("admin", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
  timestamps: false // This line disables createdAt and updatedAt columns
});

export default Admin;