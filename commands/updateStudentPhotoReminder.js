import cron from "node-cron" 
import transporter from "../config/mail.js";
import { Student } from "../models/associations.js";

cron.schedule("27 15 * * *", async () => {
    try{
        const studentsWithoutImages = await Student.findAll({
            where: {
                image: null
            }
        })
    
        for (const student of studentsWithoutImages) {
            await transporter.sendMail({
                from: `"Student CMS" <${process.env.EMAIL_USER}>`,
                to: student.email,
                subject: "Welcome to Student CMS 🎉",
                text: `Hi ${student.name}, welcome to Student CMS!`,
                html: `
                    <h2>Hi ${student.name},</h2>
                    <p>We noticed you haven't set your profile photo yet.</p>
                    <p>Please log in and update your profile to complete your account ✅</p>
                `,
            });
    
            console.log(`📧 Reminder sent to ${student.email}`);
        }
    }
    catch(error) {
        console.error("❌ Error in cron job:", error);
    }
})