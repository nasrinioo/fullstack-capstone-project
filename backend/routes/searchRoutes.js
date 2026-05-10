const express = require('express');
const { connectToDatabase } = require('../db');

const router = express.Router();

/**
 * GET /api/search?category=... — filter items by category (assignment requirement)
 */
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const db = await connectToDatabase();

    const filter = {};
    if (category && String(category).trim()) {
      filter.category = String(category).trim();
    }

    const items = await db.collection('items').find(filter).toArray();
    res.json({ count: items.length, category: category || null, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
});

module.exports = router;
