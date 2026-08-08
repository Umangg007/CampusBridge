const { PrismaClient } = require('@prisma/client');
const mongoose = require('mongoose');

const prisma = new PrismaClient();

const connectSQL = async () => {
  try {
    await prisma.$connect();
    console.log('✅ SQL Database connected successfully (SQLite via Prisma)');
    return true;
  } catch (error) {
    console.error('❌ SQL Connection Error:', error.message);
    return false;
  }
};

const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusbridge';
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ NoSQL Database connected successfully (MongoDB)');
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection warning (will operate in degraded mode if offline):', error.message);
    return false;
  }
};

module.exports = {
  prisma,
  connectSQL,
  connectMongo
};
