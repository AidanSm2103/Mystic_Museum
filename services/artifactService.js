const Artifact = require('../models/Artifact');

// A thin service layer between routes and the model. Routes shouldn't know about Mongoose query syntax.

async function getAll() {
  return Artifact.find().sort({ no: 1 }).lean();
}

async function getBySlug(slug) {
  return Artifact.findOne({ slug }).lean();
}

module.exports = { getAll, getBySlug };
