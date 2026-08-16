const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Mystic Museum' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About — Mystic Museum' });
});

module.exports = router;
