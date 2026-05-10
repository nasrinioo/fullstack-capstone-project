const express = require('express');
const cors = require('cors');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'giftlink-api' });
});

app.use('/api/gifts', giftRoutes);
/** Assignment: /api/search route */
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
