// These tests mock artifactService entirely — they check that the
// routes, middleware, and views work together correctly, without
// needing a real MongoDB connection. That's a deliberate scope
// choice: it keeps tests fast and runnable anywhere (including CI),
// at the cost of not proving the Mongoose queries themselves are
// correct. A separate integration test against a real test database
// would be the next thing to add if this project grew.

jest.mock('../services/artifactService');
const artifactService = require('../services/artifactService');
const request = require('supertest');
const app = require('../app');

const mockArtifacts = [
  { slug: 'reliquary', no: '001', name: 'The Gilded Reliquary', runeKey: 'rune1', teaser: 't', description: 'd', curatorNote: 'n' },
  { slug: 'astrolabe', no: '002', name: 'The Veiled Astrolabe', runeKey: 'rune2', teaser: 't', description: 'd', curatorNote: 'n' },
  { slug: 'sigil', no: '003', name: 'The Whispering Sigil', runeKey: 'rune3', teaser: 't', description: 'd', curatorNote: 'n' },
  { slug: 'crown', no: '004', name: 'The Hollow Crown', runeKey: 'rune4', teaser: 't', description: 'd', curatorNote: 'n' },
  { slug: 'ledger', no: '005', name: 'The Drowned Ledger', runeKey: 'rune5', teaser: 't', description: 'd', curatorNote: 'n' },
  { slug: 'loom', no: '006', name: 'The Ashen Loom', runeKey: 'rune6', teaser: 't', description: 'd', curatorNote: 'n' },
  { slug: 'mirror', no: '007', name: 'The Salt-Bound Mirror', runeKey: 'rune7', teaser: 't', description: 'd', curatorNote: 'n' },
  { slug: 'ember', no: '008', name: 'The Ember That Remembers', runeKey: 'rune8', teaser: 't', description: 'd', curatorNote: 'n' }
];

beforeEach(() => {
  artifactService.getAll.mockResolvedValue(mockArtifacts);
  artifactService.getBySlug.mockImplementation(async (slug) =>
    mockArtifacts.find((a) => a.slug === slug) || null
  );
});

describe('static pages', () => {
  test('GET / responds 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Mystic Museum');
  });

  test('GET /about responds 200', async () => {
    const res = await request(app).get('/about');
    expect(res.status).toBe(200);
  });

  test('GET /notes responds 200', async () => {
    const res = await request(app).get('/notes');
    expect(res.status).toBe(200);
  });
});

describe('exhibits', () => {
  test('GET /exhibits shows sealed artifacts by default', async () => {
    const res = await request(app).get('/exhibits');
    expect(res.status).toBe(200);
    expect(res.text).toContain('SEALED');
  });

  test('GET /exhibits/:slug for an unknown slug returns 404', async () => {
    const res = await request(app).get('/exhibits/not-a-real-artifact');
    expect(res.status).toBe(404);
  });

  test('GET /exhibits/:slug for a real but locked artifact shows the sealed state', async () => {
    const res = await request(app).get('/exhibits/reliquary');
    expect(res.status).toBe(200);
    expect(res.text).toContain('remains sealed');
  });
});

describe('unlock flow', () => {
  test('POST /unlock/:slug redirects with a found query param', async () => {
    const res = await request(app).post('/unlock/reliquary').set('Referer', '/exhibits');
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/^\/exhibits\?found=/);
  });

  test('after unlocking, the artifact detail page renders as unsealed', async () => {
    // request.agent persists cookies across requests, like a real browser session
    const agent = request.agent(app);
    await agent.post('/unlock/reliquary').set('Referer', '/exhibits');
    const res = await agent.get('/exhibits/reliquary');
    expect(res.status).toBe(200);
    expect(res.text).toContain('UNSEALED');
  });
});

describe('reset flow', () => {
  test('POST /reset redirects with a reset query param', async () => {
    const res = await request(app).post('/reset').set('Referer', '/about');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/about?reset=1');
  });

  test('resetting clears previously unlocked artifacts', async () => {
    const agent = request.agent(app);
    await agent.post('/unlock/reliquary').set('Referer', '/exhibits');
    let res = await agent.get('/exhibits/reliquary');
    expect(res.text).toContain('UNSEALED');

    await agent.post('/reset').set('Referer', '/exhibits');
    res = await agent.get('/exhibits/reliquary');
    expect(res.text).toContain('remains sealed');
  });
});

describe('404 handling', () => {
  test('an unknown route returns 404', async () => {
    const res = await request(app).get('/this-route-does-not-exist');
    expect(res.status).toBe(404);
  });
});
