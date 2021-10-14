let currentMessageId = 1;

const createMessage = (userId, message) => {
  return {
    _id: currentMessageId++,
    text: message,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: 'Test User',
      avatar: 'https://placeimg.com/140/140/any',
    },
  };
}

const handleMessage = (socket, userIds) => {
  socket.on('message', textMessage => {
    const userId = userIds[socket.id];
    const message = createMessage(userId, textMessage);
    console.log(message);
    socket.broadcast.emit("message", message);
  })
};

module.exports = { handleMessage };