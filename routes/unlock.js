const express = require('express');
const router = express.Router();
const artifactService = require('../services/artifactService');

// A rune is just a form on whichever page it's hidden on. Submitting it
// POSTs here, we update the session, then redirect back to where the
// visitor came from (Post/Redirect/Get, so a page refresh doesn't
// re-submit the form). No JavaScript is required for this to work.
router.post('/:slug', async (req, res, next) => {
  try {
    const artifact = await artifactService.getBySlug(req.params.slug);

    if (artifact && !req.session.unlocked.includes(artifact.slug)) {
      req.session.unlocked.push(artifact.slug);
    }

    const backTo = (req.get('Referer') || '/').split('?')[0];
    const foundName = artifact ? artifact.name : '';

    res.redirect(`${backTo}?found=${encodeURIComponent(foundName)}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
