const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
  const locals = {
    title: 'Main Title',
    description: 'Main Description',
    header: 'Main Header',
  };
  res.render('pages/index', locals);
});

router.get('/about', (req, res) => {
  const locals = {
    title: 'About Title',
    description: 'About Description',
    header: 'About Header',
  };
  res.render('pages/about', locals);
});

module.exports = router;
