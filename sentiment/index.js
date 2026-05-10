/**
 * Sentiment / NLP utilities for GiftLink.
 * Assignment: import the natural npm package.
 */
const natural = require('natural');

const tokenizer = new natural.WordTokenizer();

function tokenize(text) {
  if (!text || typeof text !== 'string') return [];
  return tokenizer.tokenize(text) || [];
}

module.exports = { natural, tokenize };
