// eslint-disable-next-line no-undef
/*global require, process, console*/
const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE']
  }
});


const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('welcome'));

let players = [];
let rooms = [
  {
    id: 1,
    maxPlayer: 4,
    players: [],
    isFull: false,
  }
];
io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('roomInfo', { totalPlayer: players.length, rooms });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    players = players.filter(s => s.id !== socket.id);
    io.emit('roomInfo', { totalPlayer: players.length, rooms });
    rooms.forEach(room => {
      const idPlayer = room.players.find(id => socket.id === id);
      if(idPlayer){
        room.isFull = false;
        room.players = room.players.filter(id => id !== idPlayer);
        io.emit('roomInfo', { totalPlayer: players.length, rooms });
      }
    });
  });

  socket.on('action', ({ type, data }) => {
    switch (type) {
    case 'join':{
      let room = rooms.find(x => x.id === data.id);
      if (room &&  room.players.length < room.maxPlayer) {
        console.log('user join room ', data.id);
        socket.join(`room.${data.id}`);
        socket.to(`room.${data.id}`).emit('notification', `player ${socket.id} has joined`);
        io.to(socket.id).emit('join', room);
        room.players.push(socket.id);
        if(room.players.length === room.maxPlayer){
          room.isFull = true;
        }
      }
      io.emit('roomInfo', { totalPlayer: players.length, rooms });

      break;
    }
    default:
      break;
    }


  });
});

http.listen(PORT, () => console.log(`Listening on ${PORT}`));
