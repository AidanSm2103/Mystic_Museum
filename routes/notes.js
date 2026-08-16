const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('notes', { title: "Curator's Notes — Mystic Museum" });
});

module.exports = router;
