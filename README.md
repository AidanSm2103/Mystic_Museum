<div align="center">

# 🏛️ Mystic Museum

**A cursed digital archive — rebuilt from a static portfolio page into a full-stack Express / EJS / MongoDB application.**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Status](https://img.shields.io/badge/status-in%20development-8f2a2a?style=for-the-badge)

</div>

---

## 📖 About

The Mystic Museum is a fictional archive of eight cursed artifacts, each sealed behind a rune hidden somewhere on the site. Find a rune, and its artifact — and a page from the curator's journal — unseal permanently for your session. Find them all, and the site itself starts to visibly corrupt.

This started as a static HTML/CSS/JS site and was rebuilt from the ground up as a learning project applying what I covered this year: Node, Express, EJS templating, MongoDB/Mongoose, and session-based state — with an emphasis on server-driven logic over client-side JavaScript.

## 📑 Contents

- [Tech Stack](#-tech-stack)
- [Setup](#-setup)
- [How the Scavenger Hunt Works](#-how-the-scavenger-hunt-works)
- [The Collection](#-the-collection)
- [Project Structure](#-project-structure)
- [Known Limitations](#-known-limitations--what-id-change-for-production)
- [Author](#-author)

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Server / Routing | Express |
| Templating | EJS |
| Database | MongoDB + Mongoose |
| Session state | express-session |
| Styling | Vanilla CSS (no framework) |

## 🚀 Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your own values (a local MongoDB URI works fine — see `MONGODB_URI` in `.env.example`)
3. `npm run seed` — wipes and re-inserts the 8 artifacts into your database
4. `npm start` (or `npm run dev`, which uses nodemon for auto-restart on file changes — already included as a dev dependency)
5. Visit `http://localhost:3000`

## 🔮 How the Scavenger Hunt Works

There's no login system — progress is tracked per-visitor via `express-session`, stored server-side against a cookie. Each hidden rune is a real `<form method="POST">` sitting somewhere on a page (see the `<% if (!isUnlocked(...)) %>` blocks in the `.ejs` files). Submitting it:

1. Hits `POST /unlock/:slug` (`routes/unlock.js`)
2. Adds that artifact's slug to `req.session.unlocked`
3. Redirects back to the page you were on (Post/Redirect/Get, so refreshing never re-submits)

Because it's a real form post rather than a `fetch()` call, the hunt works even with JavaScript disabled — the JS in `public/js/main.js` is only there for the dust animation and the "found" toast, both cosmetic.

Every request runs through `middleware/siteContext.js`, which loads all artifacts and works out the corruption level from how many are unlocked, then hands both to every view via `res.locals`.

> **Testing tip:** there's a **"SHOW RUNE HINTS"** button in the bottom-right corner of every page (from `public/js/main.js`) that outlines every unfound rune's hitbox. Handy while building — remove it before calling this "done."

## 🗝️ The Collection

<details>
<summary>Eight sealed specimens — click to reveal the catalogue (spoilers for the full lore)</summary>

| No. | Name | Teaser |
|---|---|---|
| 001 | The Gilded Reliquary | A container that should be empty. |
| 002 | The Veiled Astrolabe | It charts a sky no longer above us. |
| 003 | The Whispering Sigil | Silence around it is never total. |
| 004 | The Hollow Crown | Its wearers are remembered by no one, including themselves. |
| 005 | The Drowned Ledger | The debts recorded here have not been incurred yet. |
| 006 | The Ashen Loom | What it weaves has already happened to someone. |
| 007 | The Salt-Bound Mirror | The reflection is three seconds behind. |
| 008 | The Ember That Remembers | It has never gone out. It has never needed to. |

</details>

## 🗂️ Project Structure

```
config/db.js                  MongoDB connection
models/Artifact.js            Mongoose schema
services/artifactService.js   query layer between routes and the model
middleware/siteContext.js     loads data + hunt state onto res.locals for every request
routes/                       one file per resource (pages, exhibits, notes, unlock)
utils/runeSvg.js              generates the little line-art rune icons
views/                        EJS templates + partials/header.ejs, partials/footer.ejs
public/                       served statically — css, js
seed.js                       run once to populate the DB
```

## ⚠️ Known Limitations / What I'd Change for Production

- Sessions use the default in-memory store — fine for local dev, but it resets on every server restart and won't work if you ever run more than one server instance. `connect-mongo` is the natural upgrade (store sessions in the same MongoDB database).
- No caching on the artifact list — `siteContext` re-queries MongoDB on every single request. With only 8 documents this is trivial, but at any real scale you'd cache it.
- No tests. Worth adding a few with `supertest` if this grows.
- Not yet deployed — currently runs locally only.

## ✍️ Author

[**@AidanSm2103**](https://github.com/AidanSm2103)