import nodemailer from 'nodemailer';

export const callHandler = (req, res) => {
  res.send('Call functionality is not yet implemented');
};

export const chatHandler = (req, res) => {
  res.send('Chat functionality is not yet implemented');
};

export const videoCallHandler = (req, res) => {
  res.send('Video Call functionality is not yet implemented');
};

export const messageHandler = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youractual@gmail.com',       // <-- Replace with real Gmail
      pass: 'your-app-password',          // <-- Use app password (not your Gmail login)
    },
  });

  const mailOptions = {
    from: email,
    to: 'youractual@gmail.com', // You can send to your own email for testing
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Email sending failed: ' + error.toString());
    }
    res.send('Message sent successfully!');
  });
};
