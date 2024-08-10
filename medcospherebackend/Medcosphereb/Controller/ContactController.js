import nodemailer from 'nodemailer';

export const callHandler = (req, res) => {
  // Implement call functionality
  // For example, trigger a Twilio API call
  res.send('Call functionality is not yet implemented');
};

export const chatHandler = (req, res) => {
  // Implement chat functionality
  // For example, connect to a chat service API
  res.send('Chat functionality is not yet implemented');
};

export const videoCallHandler = (req, res) => {
  // Implement video call functionality
  // For example, connect to a video call service API
  res.send('Video Call functionality is not yet implemented');
};

export const messageHandler = (req, res) => {
  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  // Setup nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'coworking@gmail.com',
      pass: '12345'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@gmail.com',
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Message sent successfully');
  });
};
