// import app from 'app';
import app from './app';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import * as socketIo from 'socket.io';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const { PORT, POSTGRESQL_CONNECTION } = process.env;

const server = http.createServer(app);

const users = {};
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('chat-message', message => {
    socket.broadcast.emit('chat-message', message);
  });

  // Handle private messages
  socket.on('private-message', ({ recipientId, message }) => {
    const senderId = users[socket.id];
    const recipientSocket = Object.keys(users).find(socketId => users[socketId] === recipientId);

    if (recipientSocket) {
      io.to(recipientSocket).emit('private-message', {
        senderId,
        message,
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete users[socket.id];
  });
});

const sequelize = new Sequelize(`${POSTGRESQL_CONNECTION}`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    server.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));

export { server };
