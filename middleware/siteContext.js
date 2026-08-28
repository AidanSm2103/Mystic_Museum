const artifactService = require('../services/artifactService');

// Progress is tracked per-session, so "unlocked" just lives in the visitor's session for as long as their cookie lasts.
function corruptionLevel(unlockedCount) {
  if (unlockedCount >= 8) return 4;
  if (unlockedCount >= 6) return 3;
  if (unlockedCount >= 3) return 2;
  if (unlockedCount >= 1) return 1;
  return 0;
}

module.exports = async function siteContext(req, res, next) {
  try {
    if (!req.session.unlocked) {
      req.session.unlocked = [];
    }

    const artifacts = await artifactService.getAll();
    const artifactsBySlug = {};
    artifacts.forEach((a) => {
      artifactsBySlug[a.slug] = a;
    });

    const unlockedCount = req.session.unlocked.length;

    // Automatically available inside every EJS view rendered on this request, including included partials
    res.locals.artifacts = artifacts;
    res.locals.artifactsBySlug = artifactsBySlug;
    res.locals.totalArtifacts = artifacts.length;
    res.locals.unlockedCount = unlockedCount;
    res.locals.isUnlocked = (slug) => req.session.unlocked.includes(slug);
    res.locals.corruptionLevel = corruptionLevel(unlockedCount);

    next();
  } catch (err) {
    next(err);
  }
};