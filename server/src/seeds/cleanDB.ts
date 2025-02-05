import { Item } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    
    await Item.deleteMany({});
    console.log('Item collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
