import { validateBody } from 'helpers/validateWrapper';
import messageSchema from 'middlewares/validators/messageSchema';
import { Server } from 'socket.io';

const users = {};

export const ioService = server => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', socket => {
    console.log('User connected:', socket.id);

    socket.on('authenticate', user => {
      users[socket.id] = user;
    });

    // Handle messages
    socket.on('private-message', ({ recipientId, message }) => {
      const sender = users[socket.id];
      const recipientSocket = Object.keys(users).find(socketId => users[socketId]?.id === recipientId);

      if (recipientSocket) {
        io.to(recipientSocket).emit('private-message', {
          sender,
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
