const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email
        pass: 'your-email-password'   // Your email password
    }
});

app.post('/send-email', (req, res) => {
    const { name, address, paymentMethod, products } = req.body;

    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'Anusha172003@gmail.com',
        subject: 'New Order Received',
        text: `
            New Order Details:
            Name: ${name}
            Address: ${address}
            Payment Method: ${paymentMethod}
            Products: ${products}
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Order placed successfully');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
