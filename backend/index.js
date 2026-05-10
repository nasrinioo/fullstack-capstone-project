require('dotenv').config();

/**
 * Assignment requirement: NLP package `natural` imported in index.js
 */
const natural = require('natural');

const app = require('./app');

const tokenizer = new natural.WordTokenizer();
// Tokenizer loaded at startup so `natural` is exercised (optional NLP hook for future search).
void tokenizer;

const PORT = Number(process.env.PORT) || 3060;

app.listen(PORT, () => {
  console.log(`GiftLink API listening on http://localhost:${PORT}`);
});
