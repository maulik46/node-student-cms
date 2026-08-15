import moment from "moment";
import transporter from "../config/mail.js";
import { upload } from "../middleware/upload.js";
import { Attendence, Student } from "../models/associations.js";
import { studentSchema } from "../validation/StudentValidator.js";
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fn, literal, Op } from "sequelize";

export async function getAllStudents(req, res) {
    try {
        const students = await Student.findAll();
        
        return res.status(200).json(students);
    }
    catch(error) {
        return res.status(500)
        .json({ 
            error: error.message 
        });
    }
};

export async function getStudentById(req, res) {
    try {
        const student = await Student.findByPk(req.params.id);
        
        if(!student){
            throw new Error("Student not found!");
        }

        return res.status(200).json(student);
    }
    catch(err) {
        return res.status(500)
        .json({ 
            error: err.message 
        });
    }
}

export async function createStudent(req, res) {
    try{
        const { error, value } = studentSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map(d => d.message) });
        }
        
        const hashed = await bcrypt.hash(value.password, 10);
        const newStudent = await Student.create({
            ...value,
            password: hashed
        });

        if(!newStudent){
            throw new Error("Student can not be created!");
        }

        await transporter.sendMail({
            from: `"Student CMS" <${process.env.EMAIL_USER}>`,
            to: newStudent.email,
            subject: "Welcome to Student CMS 🎉",
            text: `Hi ${newStudent.name}, welcome to Student CMS!`,
            html: `<h2>Hi ${newStudent.name},</h2><p>Welcome to <b>Student CMS</b>! We are excited to have you 🎉</p>`,
        });

        return res.status(201).json({
            message: "Student created successfully" 
        });
    }
    catch(error){
        return res.status(500)
        .json({ 
            error: error.message 
        });
    }
}

export async function updateStudentById(req, res) {
    try{
        const { id } = req.params;
        const { name, email, address } = req.body;

        const [updated] = await Student.update(
            { name, email, address },
            { where: { id } }
        );
        
        if(!updated){
            throw new Error("Student can not be updated!");
        }

        return res.status(200).json({
            message: "Student updated successfully" 
        });
    }
    catch(error){
        return res.status(500)
        .json({ 
            error: error.message 
        });
    }
}

export async function updateStudentImageById(req, res) {
    try {
        const { id } = req.params;

        await new Promise((resolve, reject) => {
            const handler = upload.single('image');
            handler(req, res, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        if (!req.file) {
            return res.status(400).json({ error: 'Please send image' });
        }
        
        const image = req.file ? req.file.filename : undefined;
    
        const [updated] = await Student.update(
            { image },
            { where: { id } }
        );
        
        if(!updated){
            throw new Error("Student image can not be updated!");
        }
    
        return res.status(200).json({
            message: "Student image updated successfully" 
        });
    }
    catch(err) {
        return res.status(500)
        .json({ 
            error: err.message 
        });
    }
}

export async function deleteStudentById(req, res) {
    try {
        const student = await Student.findByPk(req.params.id);
        if(!student){
            throw new Error("Student not found!");
        }
        
        if (student.image) {
            const imagePath = path.join(process.cwd(), 'uploads', student.image);
            
            try {
                if (fs.existsSync(imagePath)) {
                    await fs.promises.unlink(imagePath);
                }
            } catch (err) {
                console.error('Error deleting image:', err.message);
            }
        }

        await student.destroy();

        return res.status(200).json({
            message: "Student deleted successfully" 
        });

    }
    catch(err) {
        return res.status(500)
        .json({ 
            error: err.message 
        });
    }
}

export async function queryPlayground(req, res) {
    // var data = await Student.findAll({
    //     include: [{ 
    //         model: Attendence, 
    //         as: "attendences",
    //         attributes: ["date", "attendence"],
    //     }],
    // });

    // var data = await Attendence.findAll({
    //     include: [{
    //         model: Student,
    //         as: 'student',
    //         attributes: ["id", "name", "email"]
    //     }]
    // })

    // var startDate = "2025-11-09";
    // var endDate = "2025-11-09";
    // var data = await Attendence.findAll({
    //     include: [{
    //         model: Student,
    //         as: 'student',
    //         attributes: ["name", "email"]
    //     }],
    //     where: {
    //         date: {
    //             [Op.between]: [
    //                 moment(startDate).startOf("day").toDate(),
    //                 moment(endDate).endOf("day").toDate(),
    //             ],
    //         },
    //         attendence: 0
    //     }
    // })

    const month = 11;
    const year = 2025;

    const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = moment(`${year}-${month}-01`).endOf("month").toDate();

    const student_id = 2;

    var data = await Student.findAll({
        include: [{ 
            model: Attendence, 
            as: "attendences",
            attributes: [
                [fn("SUM", literal("CASE WHEN attendence = 1 THEN 1 ELSE 0 END")), "total_present"],
                [fn("SUM", literal("CASE WHEN attendence = 0 THEN 1 ELSE 0 END")), "total_absent"],
            ],
            where: {
                date: { [Op.between]: [startDate, endDate] },
            },
        }],
        where: {
            // id: student_id
        },
        group: ["students.id"],
    });

    return res.status(200).json({
        message: "success" ,
        data,
        // attendence: attendence
    });
}
