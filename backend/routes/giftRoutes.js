const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../db');

const router = express.Router();

/**
 * GET /api/gifts — list all gift items
 */
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('items').find({}).toArray();
    res.json(gifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load gifts', error: err.message });
  }
});

/**
 * GET /api/gifts/:id — single item detail
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid item id' });
    }
    const db = await connectToDatabase();
    const gift = await db.collection('items').findOne({ _id: new ObjectId(id) });
    if (!gift) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    res.json(gift);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load gift', error: err.message });
  }
});

module.exports = router;
