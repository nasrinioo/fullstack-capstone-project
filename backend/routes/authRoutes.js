const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../db');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'giftlink-dev-secret-change-in-production';
const SALT_ROUNDS = 10;

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

/**
 * POST /api/auth/register
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, and password are required' });
    }

    const db = await connectToDatabase();
    const existing = await db.collection('users').findOne({ email: String(email).toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const doc = {
      username: String(username).trim(),
      email: String(email).toLowerCase().trim(),
      passwordHash,
      createdAt: new Date(),
    };
    const result = await db.collection('users').insertOne(doc);
    const user = { _id: result.insertedId, username: doc.username, email: doc.email };
    const token = signToken({ ...user, _id: result.insertedId });
    res.status(201).json({ message: 'Registered successfully', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

/**
 * POST /api/auth/login — returns JWT
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

/**
 * PUT /api/auth/user — update user (authenticated)
 */
router.put('/user', authMiddleware, async (req, res) => {
  try {
    const { username, email } = req.body || {};
    const updates = {};
    if (username !== undefined) updates.username = String(username).trim();
    if (email !== undefined) updates.email = String(email).toLowerCase().trim();
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No updatable fields provided (username, email)' });
    }

    const db = await connectToDatabase();
    const _id = new ObjectId(req.user.sub);
    const u = await db.collection('users').findOneAndUpdate(
      { _id },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!u) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: 'User updated',
      user: { _id: u._id, username: u.username, email: u.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
