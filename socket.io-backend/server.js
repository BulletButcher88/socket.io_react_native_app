const io = require('socket.io')();

io.on('connection', (socket) => {
  console.log("a user is connected")
  socket.on('message', message => {
    io.emit("message", message)
  })
})


io.listen(3001)