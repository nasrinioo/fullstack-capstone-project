/**
 * Seeds 16 gift items into MongoDB. Run: npm run seed
 * Prints inserted_items count for assignment evidence (Task 3).
 */
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DB || 'giftlink';

const items = [
  { productName: 'Ceramic mixing bowls (set of 3)', category: 'Kitchen', description: 'Unused wedding gift, white glaze.', posted_by: 'seed', date: new Date() },
  { productName: 'Desk lamp — LED', category: 'Home Office', description: 'Warm light, adjustable arm.', posted_by: 'seed', date: new Date() },
  { productName: 'Kids bicycle 16"', category: 'Outdoors', description: 'Outgrown, tires hold air.', posted_by: 'seed', date: new Date() },
  { productName: 'Yoga mat', category: 'Fitness', description: 'Light use, cleaned.', posted_by: 'seed', date: new Date() },
  { productName: 'Hardcover novels (bundle)', category: 'Books', description: 'Mystery & literary fiction mix.', posted_by: 'seed', date: new Date() },
  { productName: 'Blender', category: 'Kitchen', description: 'Works well, moving sale.', posted_by: 'seed', date: new Date() },
  { productName: 'Throw pillows (2)', category: 'Decor', description: 'Neutral tones.', posted_by: 'seed', date: new Date() },
  { productName: 'Cordless drill', category: 'Tools', description: 'Battery + charger included.', posted_by: 'seed', date: new Date() },
  { productName: 'Winter coat — size M', category: 'Clothing', description: 'Dry-cleaned.', posted_by: 'seed', date: new Date() },
  { productName: 'Board games collection', category: 'Games', description: 'Catan, Ticket to Ride, etc.', posted_by: 'seed', date: new Date() },
  { productName: 'Plant pots (terracotta)', category: 'Garden', description: 'Various sizes.', posted_by: 'seed', date: new Date() },
  { productName: 'USB-C hub', category: 'Electronics', description: '7-in-1, tested on MacBook.', posted_by: 'seed', date: new Date() },
  { productName: 'Dog crate — medium', category: 'Pets', description: 'Foldable, clean.', posted_by: 'seed', date: new Date() },
  { productName: 'Dining chairs (pair)', category: 'Furniture', description: 'Wood frame, fabric seat.', posted_by: 'seed', date: new Date() },
  { productName: 'Art supplies bundle', category: 'Crafts', description: 'Sketch pads, pencils, acrylics.', posted_by: 'seed', date: new Date() },
  { productName: 'Coffee maker — drip', category: 'Kitchen', description: '12-cup, includes filters.', posted_by: 'seed', date: new Date() },
];

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  await db.collection('items').deleteMany({ posted_by: 'seed' });
  const result = await db.collection('items').insertMany(items);
  const inserted_items = Object.keys(result.insertedIds).length;
  console.log(JSON.stringify({ inserted_items, acknowledged: result.acknowledged }, null, 2));
  await client.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
