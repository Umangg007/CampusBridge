const Redis = require('ioredis');

const host = process.env.REDIS_HOST || '127.0.0.1';
const port = parseInt(process.env.REDIS_PORT || '6379', 10);

const redis = new Redis({
  host,
  port,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 5) {
      console.warn('⚠️ Redis connection attempts exhausted. Falling back.');
      return null;
    }
    return Math.min(times * 200, 2000);
  }
});

let isConnected = false;

redis.on('connect', () => {
  isConnected = true;
  console.log('✅ Key-Value Database connected successfully (Redis 7 on 127.0.0.1:6379)');
});

redis.on('ready', () => {
  isConnected = true;
});

redis.on('error', (err) => {
  isConnected = false;
  console.warn('⚠️ Redis error:', err.message);
});

const connectRedis = async () => {
  try {
    if (redis.status === 'ready' || redis.status === 'connect') {
      isConnected = true;
      return true;
    }
    await redis.connect();
    isConnected = true;
    return true;
  } catch (error) {
    console.warn('⚠️ Redis server warning:', error.message);
    return false;
  }
};

module.exports = {
  redis,
  connectRedis,
  isRedisConnected: () => isConnected || redis.status === 'ready' || redis.status === 'connect'
};
