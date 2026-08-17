# Mystic Museum

An Express / EJS / MongoDB rebuild of the original static Mystic Museum site.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your own values (a local MongoDB URI works fine — see `MONGODB_URI` in `.env.example`)
3. `npm run seed` — wipes and re-inserts the 8 artifacts into your database
4. `npm start` (or `npm run dev`, which uses nodemon for auto-restart on file changes — already included as a dev dependency)
5. Visit `http://localhost:3000`.

## How the scavenger hunt works

There's no login system — progress is tracked per-visitor via `express-session`, stored server-side against a cookie. Each hidden rune is a real `<form method="POST">` sitting somewhere on a page (see the `<% if (!isUnlocked(...)) %>` blocks in the `.ejs` files). Submitting it:

1. Hits `POST /unlock/:slug` (`routes/unlock.js`)
2. Adds that artifact's slug to `req.session.unlocked`
3. Redirects back to the page you were on (Post/Redirect/Get, so refreshing never re-submits)

Because it's a real form post rather than a `fetch()` call, the hunt works even with JavaScript disabled — the JS in `public/js/main.js` is only there for the dust animation and the "found" toast, both cosmetic.

Every request runs through `middleware/siteContext.js`, which loads all artifacts and works out the corruption level from how many are unlocked, then hands both to every view via `res.locals`.

There's a **"SHOW RUNE HINTS"** button in the bottom-right corner of every page (from `public/js/main.js`) that outlines every unfound rune's hitbox — handy for testing, delete it before you'd call this "done."

## Project structure

```
config/db.js          MongoDB connection
models/Artifact.js     Mongoose schema
services/artifactService.js   query layer between routes and the model
middleware/siteContext.js     loads data + hunt state onto res.locals for every request
routes/                one file per resource (pages, exhibits, notes, unlock)
utils/runeSvg.js       generates the little line-art rune icons
views/                 EJS templates + partials/header.ejs, partials/footer.ejs
public/                served statically — css, js
seed.js                run once to populate the DB
```

## Known limitations / What I'd change for production

- Sessions use the default in-memory store — fine for local dev, but it resets on every server restart and won't work if you ever run more than one server instance. `connect-mongo` is the natural upgrade (store sessions in the same MongoDB database).
- No caching on the artifact list — `siteContext` re-queries MongoDB on every single request. With only 8 documents this is trivial, but at any real scale you'd cache it.
- No tests. Worth adding a few with `supertest` if this grows.
