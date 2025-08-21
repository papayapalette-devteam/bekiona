const nodemailer = require('nodemailer');

const cloudinary=require('cloudinary').v2
const fs=require('fs')
const path=require('path')



let otpStore = {}; // Store OTPs temporarily

const send_mailotp = async (req, res) => {
    try {
        const { email } = req.body;
                const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
                otpStore[email] = otp;

        if (!email ) {
            return res.status(400).send('No recipients provided.');
        }

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'digvijaykumar.315@gmail.com',
        //         pass: 'cuay fuho ucki htpk'
        //     }
        // });

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465, // Use 587 for TLS, 465 for SSL
        //     secure: true, // True for SSL, false for TLS
        //     auth: {
        //         user: 'digvijaykumar.315@gmail.com',
        //         pass: 'cuay fuho ucki htpk'
        //     }
        // });

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465, // Use TLS
            secure: true, // Use false for TLS
            auth: {
                user: 'digvijaykumar.315@gmail.com',
                pass: 'cuay fuho ucki htpk' // Use App Password
            },
           
        });

        // const transporter = nodemailer.createTransport({
        //     host: "mail.onlinerealestatecrm.in", // Your cPanel mail server
        //     port: 465, // Use 465 for SSL (or 587 for TLS)
        //     secure: true, // true for SSL
        //     auth: {
        //         user: "_mainaccount@onlinerealestatecrm.in", // Your cPanel email
        //         pass: "5:[5dX23KpLtpY" // Your actual email password (not cPanel login)
        //     }
        // });
        
        
        
        // const mailOptions = {
        //     from: "er.abdhesh@gmail.com", // Must match your SMTP user
        //     to: email, // Recipient's email
        //     subject: "Your OTP Code",
        //     text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        // };
        const mailOptions = {
            from: '"Bekiona" <digvijaykumar.315@gmail.com>',
            to: email,
            subject: "Your OTP Code from Bekiona",
            html: `<p>Hello,</p>
                   <p>Your OTP is <strong>${otp}</strong>. It is valid for 5 minutes.</p>
                   <p>If you did not request this, please ignore this email.</p>
                   <p>Best regards,<br>Bekiona Team</p>`,
        };
        
        

       
            await transporter.sendMail({ ...mailOptions, to: email });
        

        res.status(200).send('Otp sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email and missing email');
    }
};

const verifyotpandlogin=async(req,res)=>
{
    try {
        const { email, otp } = req.body;

            if (otpStore[email] && otpStore[email] == otp) {
                delete otpStore[email]; // Remove OTP after verification
                res.json({ success: true, message: "OTP verified successfully",user:email });
            } else {
                res.status(400).json({ success: false, message: "Invalid OTP" });
            }
                    
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {send_mailotp,verifyotpandlogin};
