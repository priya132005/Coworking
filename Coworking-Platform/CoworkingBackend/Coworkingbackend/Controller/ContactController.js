import sendEmail from '../utils/sendEmail.js';
import ContactMessageModel from '../Models/ContactMessageModel.js';

export const callHandler = (req, res) => {
  res.send('Call functionality is not yet implemented');
};

export const chatHandler = (req, res) => {
  res.send('Chat functionality is not yet implemented');
};

export const videoCallHandler = (req, res) => {
  res.send('Video Call functionality is not yet implemented');
};

// @route   POST /api/message
// @desc    Demo contact form. Always saves the message to the database so
//          nothing is lost. If SMTP credentials are configured in .env, it
//          also tries to forward the message by email — but a missing or
//          misconfigured SMTP setup will NEVER cause this to fail, since
//          email sending is treated as a best-effort bonus, not the source
//          of truth.
export const messageHandler = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Name, email and message are all required',
        error: true,
        success: false,
      });
    }

    const savedMessage = await ContactMessageModel.create({ name, email, message });

    // Best-effort email notification — failures here are logged, not thrown.
    const smtpConfigured =
      process.env.SMTP_HOST && process.env.SMTP_USERNAME && process.env.SMTP_PASSWORD;

    if (smtpConfigured) {
      const destination = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_FROM_EMAIL;
      const subject = `New contact form message from ${name}`;
      const html = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;

      sendEmail(destination, subject, html).catch((err) => {
        console.error('Contact form email failed to send (message was still saved):', err.message);
      });
    }

    res.status(200).json({
      message: "Message sent successfully! We'll get back to you soon.",
      data: savedMessage,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Failed to send message',
      error: true,
      success: false,
    });
  }
};

// @route   GET /api/messages  (admin only)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessageModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Messages fetched successfully',
      data: messages,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};

// @route   PUT /api/messages/:id/read  (admin only)
export const markMessageAsRead = async (req, res) => {
  try {
    const updated = await ContactMessageModel.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Message not found',
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: 'Message marked as read',
      data: updated,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server error',
      error: true,
      success: false,
    });
  }
};
