// backend/socket/socketHandler.js

export const handleSocket = (io, socket, userSocketMap) => {
  console.log(' Connected:', socket.id);

  //  Register user with socket
  socket.on('register_user', (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(` Registered user ${userId} with socket ${socket.id}`);
  });

  //  Handle file transfer
  socket.on('send_file', ({ toUserId, fileBuffer, fileName, fromUserId }) => {
    const receiverSocketId = userSocketMap.get(toUserId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_file', {
        fileBuffer,
        fileName,
        fromUserId,
      });
      console.log(` File sent from ${fromUserId} to ${toUserId}`);
    } else {
      console.log(` User ${toUserId} not connected. File not sent.`);
      socket.emit('error', { message: 'Receiver not connected' });
    }
  });

  socket.on('disconnect', () => {
    console.log(' Disconnected:', socket.id);
    for (const [userId, sid] of userSocketMap.entries()) {
      if (sid === socket.id) {
        userSocketMap.delete(userId);
        console.log(` Removed ${userId} from socket map`);
        break;
      }
    }
  });
};
