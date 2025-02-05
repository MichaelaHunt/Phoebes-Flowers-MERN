//import enviorment variables
import dotenv from 'dotenv';
dotenv.config();
//connect to MongoDB
import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI || '';

// 
const db = async (): Promise<typeof mongoose.connection> => {
    try {
        // attempt to connect to the database
        await mongoose.connect(MONGODB_URI);
        console.log('Database connected.');
        // return the connection
        return mongoose.connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
    };

export default db;