const Artifact = require('../models/Artifact');

// A thin service layer between routes and the model
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

module.exports = { getAll, getBySlug};

