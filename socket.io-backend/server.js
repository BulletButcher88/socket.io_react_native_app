const io = require('socket.io')();
const uuid = require('uuid')
const messageHandler = require('./handlers/handler.message');

const users = {};

const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`
}

const userOnline = () => {
  const values = Object.values(users);
  const onlyWithUsername = values.filter(u => u.username !== undefined);
  return onlyWithUsername;
}

io.on("connection", socket => {
  console.log("a user is connected")
  console.log(socket.id)
  users[socket.id] = { userId: uuid.v1() };

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "user_online", data: userOnline() })
  });

  socket.on("action", action => {
    switch (action.type) {
      case "server/join":
        console.log(action.data)
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatarUrl();
        io.emit("action", {
          type: "user_online",
          data: userOnline()
        })
        socket.emit("action", { type: "self_user", data: users[socket.id] })
        break;
      case "server/private-message":
        console.log(action.data)
    }
  })
})


io.listen(3001)