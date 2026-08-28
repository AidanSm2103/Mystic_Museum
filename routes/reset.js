const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.unlocked = [];
  const backTo = (req.get('Referer') || '/').split('?')[0];
  res.redirect(`${backTo}?reset=1`);
});

module.exports = router;