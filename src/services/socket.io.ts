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

    // Handle user authentication
    socket.on('authenticate', user => {
      users[socket.id] = user;
      console.log('users :>> ', users);
    });

    // Handle private messages
    socket.on('private-message', ({ recipientId, message }) => {
      console.log('recipientId :>> ', recipientId);
      console.log('message :>> ', message);
      console.log('users :>> ', users);
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
