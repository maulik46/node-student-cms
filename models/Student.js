import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Attendence from "./Attendence.js";
// import database from "../config/database.js";

// async function index() {
//     const [rows] = await database.query('SELECT * FROM students');

//     return rows;
// };

// async function search(id) {
//     const [row] = await database.query('SELECT * FROM students WHERE id = ?', [id]);

//     return row;
// };

// async function create(newStudent) {
//     const [result] = await database.query('INSERT INTO students SET ?', newStudent);
    
//     return result.affectedRows ? 1 : 0;
// };

// async function update(id, updatedStudent) {
//     const [result] = await database.query('UPDATE students SET ? WHERE id = ?', [updatedStudent, id]);

//     return result.affectedRows ? 1 : 0;
// };

// async function remove(id) {
//     const [result] = await database.query('DELETE FROM students WHERE id = ?', [id]);

//     return result.affectedRows ? 1 : 0;
// };

// export default {
//     index,
//     search,
//     create,
//     update,
//     remove
// }

const Student = sequelize.define("students", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    tableName: "students",
    timestamps: false // This line disables createdAt and updatedAt columns
});

export default Student;