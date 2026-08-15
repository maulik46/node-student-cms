import dotenv from "dotenv";
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or your SMTP host
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('❌  Mail server connection failed:', error);
  } else {
    console.log('✅  Mail server connected');
  }
});

export default transporter;