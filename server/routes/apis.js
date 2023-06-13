const express = require('express');
const router = express.Router();
const sendEmail = require('../services/sendEmail');

router.get('', (req, res) => {
  try {
    res.status(201).json({ message: 'Connected Good' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error from Vovas Server' });
  }
});

router.get('v1/verifications/email/request', (req, res) => {
  try {
    sendEmail();
    res.status(201).json({ message: 'Connected Good' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error from Vovas Server' });
  }
});

module.exports = router;
