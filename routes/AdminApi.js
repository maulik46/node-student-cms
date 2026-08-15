import { Router } from "express";
import {
    login,
    signup,
} from "../controllers/AdminController.js"

const route = Router();

// Routes
route.post('/login', login);
route.post('/signup', signup);

export default route;