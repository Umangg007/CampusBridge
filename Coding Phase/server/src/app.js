const express = require('express');
const cors = require('cors');
const { prisma } = require('./config/db');
const mongoose = require('mongoose');
const { isRedisConnected } = require('./config/redis');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Mount API Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1', require('./routes/api'));

// Multi-Database Health & Diagnostic Endpoint
app.get('/api/v1/health', async (req, res) => {
  let sqlStatus = 'OFFLINE';
  let noSqlStatus = 'OFFLINE';
  const redisStatus = isRedisConnected() ? 'ONLINE' : 'DEGRADED/OFFLINE';

  try {
    await prisma.$queryRaw`SELECT 1`;
    sqlStatus = 'ONLINE (SQLite via Prisma)';
  } catch (err) {
    sqlStatus = `ERROR: ${err.message}`;
  }

  if (mongoose.connection.readyState === 1) {
    noSqlStatus = 'ONLINE (MongoDB)';
  } else {
    noSqlStatus = 'DEGRADED / DISCONNECTED';
  }

  res.json({
    status: 'UP',
    system: 'CampusBridge Engine v1.0',
    timestamp: new Date().toISOString(),
    databases: {
      relationalSQL: sqlStatus,
      documentNoSQL: noSqlStatus,
      keyValueCacheRedis: redisStatus
    }
  });
});

module.exports = app;
