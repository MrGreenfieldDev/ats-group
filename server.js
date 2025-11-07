// Corrected server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ... existing code ...

// app.use((req, res) => {
//     res.status(404);
    
//     const errorPagePath = path.join(__dirname, 'public', '404.html');

//     res.sendFile(errorPagePath, (err) => {
//         if (err) {
//             console.error('Failed to send 404.html:', err.message);
//             res.type('text/plain').send('404 Page Not Found');
//         }
//     });
// });

// ... rest of your code ...

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Brevo's SMTP server
    port: 587,
    secure: false, // Use STARTTLS (port 587)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_API
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: process.env.SMTP_RECIPIENT,
        to: process.env.SMTP_RECIPIENT,
        subject: 'New Contact Form Submission',
        text: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50; border-bottom: 2px solid #eee; padding-bottom: 5px;">
                New Contact Form Submission
            </h2>
            
            <p>A user submitted the following details:</p>
            
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 10px;">
                    <strong>Name:</strong> ${name}
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Email:</strong> <a href="mailto:${email}" style="color: #1E88E5;">${email}</a>
                </li>
                <li style="margin-bottom: 10px;">
                    <strong>Phone:</strong> ${phone || 'N/A (No phone provided)'}
                </li>
            </ul>
            
            <h3 style="color: #555; margin-top: 20px;">Message:</h3>
            
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #4CAF50; white-space: pre-wrap;">
                ${message}
            </p>
        </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Error sending email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});