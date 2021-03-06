const cors = require('cors');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const {addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);


io.on('connect', (socket) => {
    console.log("We have connected!");

    socket.on('join', ({name, room}, callback) => {
        const {error, user } = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        // sending messages from backend to frontend
        socket.emit('message', {user: 'admin', text:`${user.name}, welcome to the chat ${user.room}!`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});

        socket.join(user.room);

        callback();
    });

    // expect event from backend and emit it to frontend
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback;
    });

    socket.on('disconnect', () => {
        console.log("We are disconnected!");
    });
});

app.use(router)

server.listen(PORT, () => console.log(`Server has been started on a server ${PORT}`));