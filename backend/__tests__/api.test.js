/**
 * Integration tests against MongoDB (GitHub Actions provides mongo service).
 */
const request = require('supertest');
const { MongoClient } = require('mongodb');
const { closeDatabase } = require('../db');
const app = require('../app');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DB || 'giftlink_test';

let client;

beforeAll(async () => {
  process.env.MONGODB_DB = dbName;
  client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  await db.collection('items').deleteMany({});
  await db.collection('users').deleteMany({});
  await db.collection('items').insertMany([
    { productName: 'Test kettle', category: 'Kitchen', description: 'Test', posted_by: 'test', date: new Date() },
    { productName: 'Test chair', category: 'Furniture', description: 'Test', posted_by: 'test', date: new Date() },
  ]);
});

afterAll(async () => {
  await closeDatabase();
  if (client) await client.close();
});

describe('GiftLink API', () => {
  test('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/gifts returns items', async () => {
    const res = await request(app).get('/api/gifts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  test('GET /api/search filters by category', async () => {
    const res = await request(app).get('/api/search').query({ category: 'Kitchen' });
    expect(res.status).toBe(200);
    expect(res.body.items.every((i) => i.category === 'Kitchen')).toBe(true);
  });

  test('POST /api/auth/register and login returns JWT', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      username: 'tester',
      email: 'tester@giftlink.local',
      password: 'secretpass123',
    });
    expect(reg.status).toBe(201);
    expect(reg.body.token).toBeDefined();

    const login = await request(app).post('/api/auth/login').send({
      email: 'tester@giftlink.local',
      password: 'secretpass123',
    });
    expect(login.status).toBe(200);
    expect(login.body.token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });
});
