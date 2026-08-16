const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    no: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    runeKey: {
      type: String,
      required: true
      // references a shape in utils/runeSvg.js — kept separate from
      // the data itself since it's a presentation concern, not content
    },
    teaser: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    curatorNote: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Artifact', artifactSchema);