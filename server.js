require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const connectDB = require('./config/db');
const siteContext = require('./middleware/siteContext');
const { runeSVG } = require('./utils/runeSvg');

const pageRoutes = require('./routes/pages');
const exhibitRoutes = require('./routes/exhibits');
const noteRoutes = require('./routes/notes');
const unlockRoutes = require('./routes/unlock');

const app = express();

connectDB();

// ---------- view engine ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.runeSVG = runeSVG; // available in every view without passing it explicitly

// ---------- core middleware ----------
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // parses the <form> POST bodies
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mystic-museum-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
    // NOTE: this uses the default in-memory session store, which is
    // fine for a local portfolio demo but resets on every restart and
    // isn't suitable for production. connect-mongo is the natural
    // upgrade if this ever needs to survive a redeploy.
  })
);

// runs on every request: loads artifacts + computes hunt/corruption state
app.use(siteContext);

// ---------- routes ----------
app.use('/', pageRoutes);
app.use('/exhibits', exhibitRoutes);
app.use('/notes', noteRoutes);
app.use('/unlock', unlockRoutes);

// ---------- error handling ----------
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something in the archive went wrong.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mystic Museum listening on http://localhost:${PORT}`);
});
