import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudentById,
    updateStudentById,
    updateStudentImageById,
    queryPlayground
} from "../controllers/StudentController.js"

const route = Router();

// Routes
route.get('/playground', queryPlayground);

route.get('/all', authenticate, getAllStudents);
route.get('/:id', authenticate, getStudentById);
route.post('/', authenticate, createStudent);
route.put('/:id', authenticate, updateStudentById);
route.delete('/:id', authenticate, deleteStudentById);
route.put('/:id/image', authenticate, updateStudentImageById);

export default route;