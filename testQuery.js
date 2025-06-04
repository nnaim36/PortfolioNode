import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './BingoCard/Users/schema.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to DB:", mongoose.connection.name);

const user = await User.findOne({ username: 'pilesMongo' });
console.log("🔍 Manual query result:", user);

await mongoose.disconnect();