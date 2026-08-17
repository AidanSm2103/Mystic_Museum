// Runs before every test file. Setting NODE_ENV here (rather than via
// a shell env var) keeps `npm test` identical on Windows, Mac, and
// Linux — no cross-env dependency needed.
process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-secret';