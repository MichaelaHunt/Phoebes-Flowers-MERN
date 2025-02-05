import db from '../config/connections.js';
import { Item } from '../models/index.js';
import cleanDB from './cleanDB.js';

import itemData from './itemData.json' assert { type: 'json'};

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await Item.insertMany(itemData);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();