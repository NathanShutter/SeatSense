const nodemailer = require('nodemailer');

// Function to send password reset email
async function sendPasswordResetEmail(email, resetLink) {
    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
        // Your email transport configuration SMTP for gmail
        host: 'smtp.office365.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'SeatSense@outlook.com',
            pass: 'Seat24Sense14'
        }
    });

    // Define email content
    let mailOptions = {
        from: 'SeatSense@outlook.com',
        to: email,
        subject: 'SeatSense - Password Reset Request',
        text: `Click the following link to reset your password: ${resetLink}`
    };

    // Send email
    await transporter.sendMail(mailOptions);
}

module.exports = {
    sendPasswordResetEmail
};