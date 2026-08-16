// Run with: npm run seed
// Wipes the artifacts collection and re-inserts the full catalogue.

require('dotenv').config();
const mongoose = require('mongoose');
const Artifact = require('./models/Artifact');

const artifacts = [
  {
    slug: 'reliquary',
    no: '001',
    name: 'The Gilded Reliquary',
    runeKey: 'rune1',
    teaser: 'A container that should be empty.',
    description:
      'An ancient container. Rumors say it once held the remains of an ancient god, and that the reliquary has spent every year since trying to fill the void it left behind.',
    curatorNote:
      'I have weighed the reliquary three times this week. Each time it is heavier than the last, though nothing has been placed inside.'
  },
  {
    slug: 'astrolabe',
    no: '002',
    name: 'The Veiled Astrolabe',
    runeKey: 'rune2',
    teaser: 'It charts a sky no longer above us.',
    description:
      'A celestial instrument recovered from a collapsed observatory. Each inscribed star has not been visible from Earth for thousands of years — yet the astrolabe still tracks their movement, precisely.',
    curatorNote:
      "The astrolabe's needle moved again last night. I checked the star charts. The star it points to burned out before written history began."
  },
  {
    slug: 'sigil',
    no: '003',
    name: 'The Whispering Sigil',
    runeKey: 'rune3',
    teaser: 'Silence around it is never total.',
    description:
      'A carved symbol of unknown origin. Visitors who linger too close report a faint whispering — always in a language they cannot place, but somehow understand completely.',
    curatorNote:
      'I no longer transcribe what the sigil says. Writing it down did not feel like documentation. It felt like repetition.'
  },
  {
    slug: 'crown',
    no: '004',
    name: 'The Hollow Crown',
    runeKey: 'rune4',
    teaser: 'Its wearers are remembered by no one, including themselves.',
    description:
      'A ceremonial crown, remarkably light for its craftsmanship. Records suggest each of its wearers was gradually forgotten by history — and, in their final years, by their own families.',
    curatorNote:
      'I tried the crown on for eleven seconds, for the archive. I do not remember doing this. The photograph is the only proof that I did.'
  },
  {
    slug: 'ledger',
    no: '005',
    name: 'The Drowned Ledger',
    runeKey: 'rune5',
    teaser: 'The debts recorded here have not been incurred yet.',
    description:
      'A waterlogged account book, perpetually damp regardless of climate. Its entries are dated decades into the future, recording debts that have not yet been made by anyone living.',
    curatorNote:
      'My name appeared in the ledger this morning. The amount owed was left blank. I am choosing not to think about what that means.'
  },
  {
    slug: 'loom',
    no: '006',
    name: 'The Ashen Loom',
    runeKey: 'rune6',
    teaser: 'What it weaves has already happened to someone.',
    description:
      'A loom built from charred, unburning wood. The threads it produces, examined closely, resemble strands of human hair belonging to no one currently living.',
    curatorNote:
      'The loom worked through the night, unattended. I found a new length of grey thread on the frame this morning. I have not slept since.'
  },
  {
    slug: 'mirror',
    no: '007',
    name: 'The Salt-Bound Mirror',
    runeKey: 'rune7',
    teaser: 'The reflection is three seconds behind.',
    description:
      'A mirror ringed with a band of ancient, crystallized salt. Its reflection consistently lags behind reality by several seconds — long enough to notice, never long enough to prove to anyone else.',
    curatorNote:
      'I broke the salt ring to test a theory. I will not be repeating the experiment. The reflection has not caught up yet.'
  },
  {
    slug: 'ember',
    no: '008',
    name: 'The Ember That Remembers',
    runeKey: 'rune8',
    teaser: 'It has never gone out. It has never needed to.',
    description:
      'A single coal, warm to the touch, that has reportedly burned without fuel for centuries. Those who hold it report brief, vivid memories that are not their own.',
    curatorNote:
      'I held the ember for a moment, only a moment. I remembered a child in a house I have never lived in. The house was burning.'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Artifact.deleteMany({});
  await Artifact.insertMany(artifacts);
  console.log(`Seeded ${artifacts.length} artifacts.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
