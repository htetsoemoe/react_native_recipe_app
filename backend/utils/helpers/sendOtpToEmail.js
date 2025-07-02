import transporter from "../../config/nodemailer/nodemailer.js";

export const sendOtpToEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Account Verification OTP",
        text: `Your OTP is ${otp}. This OTP is valid for 24 hours. Verify your account using this OTP.`,
    }
    await transporter.sendMail(mailOptions);
}