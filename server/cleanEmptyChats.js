import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Chat from './models/Chat.js';

dotenv.config();

const cleanChats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const result = await Chat.deleteMany({ messages: { $size: 0 } });
    console.log(`Deleted ${result.deletedCount} empty chat sessions.`);

    process.exit();
  } catch (error) {
    console.error('Error cleaning chats:', error);
    process.exit(1);
  }
};

cleanChats();
