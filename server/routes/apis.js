const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/sendEmail');

router.get('', (req, res) => {
  try {
    res.status(201).json({ message: 'Connected Good' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error from Vovas Server' });
  }
});

router.get('/v1/verifications/email/request', async (req, res) => {
  try {
    // (receiverName, receiverEmail, subject, content)
    await sendEmail(
      'ToVova',
      'vladimis@amdocs.com, palkin.andrew@gmail.com, vovasvidi@gmail.com',
      'Subject Title',
      'Email Content HERE',
      '1234EF3432'
    );
    res.status(201).json({ message: 'Email was sent successufully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        'Internal server error from Vovas Server, Email was not sent please check logs',
    });
  }
});

router.post('/v1/verifications/email/request', async (req, res) => {
  try {
    // (receiverName, receiverEmail, subject, content)
    await sendEmail(
      'ToVova',
      sendToEmail,
      'Subject Title',
      'Email Content HERE',
      confirmationCode
    );
    res.status(201).json({ message: 'Email was sent successufully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        'Internal server error from Vovas Server, Email was not sent please check logs',
    });
  }
});

module.exports = router;
