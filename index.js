import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conntectDb } from "./config/database.js";
import StudentsRoutes from "./routes/StudentsApi.js";
import AdminRoutes from "./routes/AdminApi.js";
import "./commands/updateStudentPhotoReminder.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:3000",
};
 
app.use(cors(corsOptions));
app.use(express.json());
conntectDb();

app.use("/api/student", StudentsRoutes);
app.use("/api/admin", AdminRoutes);

app.listen(PORT, async() => {
    console.log(`✅  App running on http://localhost:${PORT}`);
})
