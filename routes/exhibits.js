const express = require('express');
const router = express.Router();
const artifactService = require('../services/artifactService');

router.get('/', (req, res) => {
  res.render('exhibits', { title: 'Exhibits — Mystic Museum' });
});

router.get('/:slug', async (req, res, next) => {
  try {
    const artifact = await artifactService.getBySlug(req.params.slug);

    if (!artifact) {
      return res.status(404).render('404', { title: 'Not Found' });
    }

    const unlocked = res.locals.isUnlocked(artifact.slug);

    res.render('artifact', {
      title: unlocked ? `${artifact.name} — Mystic Museum` : 'Sealed Specimen — Mystic Museum',
      artifact,
      unlocked
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;