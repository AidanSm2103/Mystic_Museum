const express = require('express');
const router = express.Router();

// "Begin the Rite anew" — scatters every rune the visitor has found
// back into shadow. Only touches session.unlocked, not the whole
// session.
router.post('/', (req, res) => {
  req.session.unlocked = [];
  const backTo = (req.get('Referer') || '/').split('?')[0];
  res.redirect(`${backTo}?reset=1`);
});

module.exports = router;