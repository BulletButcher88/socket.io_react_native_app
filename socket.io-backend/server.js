const io = require('socket.io')();
const messageHandler = require('./handlers/handler.message');

let currentUserId = 2;
const userIds = {};


io.on('connection', (socket) => {
  console.log("a user is connected")
  console.log(socket.id)
  userIds[socket.id] = currentUserId++;
  messageHandler.handleMessage(socket, userIds)
})


io.listen(3001)