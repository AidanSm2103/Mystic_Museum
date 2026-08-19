const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');

const siteContext = require('./middleware/siteContext');
const { runeSVG } = require('./utils/runeSvg');

const pageRoutes = require('./routes/pages');
const exhibitRoutes = require('./routes/exhibits');
const noteRoutes = require('./routes/notes');
const unlockRoutes = require('./routes/unlock');
const resetRoutes = require('./routes/reset');

const app = express();

// ---------- view engine ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.runeSVG = runeSVG;

// Render (and most hosts) sit behind a reverse proxy. This tells
// Express to trust the proxy's headers, which secure cookies need
// in order to work correctly once deployed.
app.set('trust proxy', 1);

// ---------- core middleware ----------
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.urlencoded({ extended: true })); // parses the <form> POST bodies
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'mystic-museum-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production' // HTTPS-only cookies once deployed
  }
};

// Tests run with an in-memory session store, so they never need a
// live database connection. Everywhere else (local dev + production),
// sessions persist in MongoDB, so they survive a server restart or
// redeploy instead of logging every visitor out.
if (process.env.NODE_ENV !== 'test') {
  sessionConfig.store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI });
}

app.use(session(sessionConfig));

// runs on every request: loads artifacts + computes hunt/corruption state
app.use(siteContext);

// ---------- routes ----------
app.use('/', pageRoutes);
app.use('/exhibits', exhibitRoutes);
app.use('/notes', noteRoutes);
app.use('/unlock', unlockRoutes);
app.use('/reset', resetRoutes);

// ---------- error handling ----------
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something in the archive went wrong.');
});

module.exports = app;
