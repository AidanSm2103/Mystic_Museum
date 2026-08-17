const Artifact = require('../models/Artifact');

// A thin service layer between routes and the model. Routes shouldn't
// know about Mongoose query syntax — they just ask for data.
//
// getAll() is called on EVERY request (via middleware/siteContext.js),
// but the artifact collection barely ever changes, so re-querying
// MongoDB every single time is wasted work. A short TTL cache means
// we hit the DB at most once a minute instead of once per request.
let cache = { data: null, expiresAt: 0 };
const CACHE_TTL_MS = 60 * 1000; // 1 minute

async function getAll() {
  const now = Date.now();
  if (cache.data && cache.expiresAt > now) {
    return cache.data;
  }
  const artifacts = await Artifact.find().sort({ no: 1 }).lean();
  cache = { data: artifacts, expiresAt: now + CACHE_TTL_MS };
  return artifacts;
}

async function getBySlug(slug) {
  return Artifact.findOne({ slug }).lean();
}

// Not called anywhere yet, but here for when this project grows an
// admin route that can edit artifacts — without this, an edit
// wouldn't show up until the cache naturally expired.
function invalidateCache() {
  cache = { data: null, expiresAt: 0 };
}

module.exports = { getAll, getBySlug, invalidateCache };

