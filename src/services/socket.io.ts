import { server } from 'server';
import * as socketIo from 'socket.io';
import { Server } from 'socket.io';

const users = {};

export const ioService = server => {
  console.log('in sockets');
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', socket => {
    console.log('User connected:', socket.id);

    // Handle user authentication
    socket.on('authenticate', userId => {
      console.log('User auth:', userId);
      users[socket.id] = userId;
    });

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
};
