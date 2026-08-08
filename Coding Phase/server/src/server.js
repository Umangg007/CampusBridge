require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { connectSQL, connectMongo } = require('./config/db');
const { connectRedis } = require('./config/redis');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log(`🔌 Socket client connected: ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`👤 Client ${socket.id} joined room: ${room}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Socket client disconnected: ${socket.id}`);
  });
});

const startServer = async () => {
  console.log('🚀 Initializing CampusBridge Engine...');

  server.listen(PORT, async () => {
    console.log(`=======================================================`);
    console.log(`🌟 CampusBridge Server listening on http://localhost:${PORT}`);
    console.log(`🏥 Health Check API: http://localhost:${PORT}/api/v1/health`);
    console.log(`=======================================================`);

    // Connect databases concurrently without blocking server port binding
    Promise.allSettled([
      connectSQL(),
      connectMongo(),
      connectRedis()
    ]);
  });
};

startServer();
