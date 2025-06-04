import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './BingoCard/Users/schema.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("123", 10);
await User.deleteOne({ username: "pilesMongo" }); // optional: cleanup old one
await User.create({
  username: "pilesMongo",
  password: hashedPassword
});

console.log("✅ Test user 'pilesMongo' inserted with password '123'");
await mongoose.disconnect();