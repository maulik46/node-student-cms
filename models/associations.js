import Attendence from "./Attendence.js";
import Student from "./Student.js";

Attendence.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});

Student.hasMany(Attendence, {
  foreignKey: "student_id",
  as: "attendences",
});

export {
    Attendence,
    Student
}