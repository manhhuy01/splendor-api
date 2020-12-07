// eslint-disable-next-line no-undef
/*global require, process, console*/

const gameHandler = require('./gameHandler');
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
const { COLOR } = require('./materials');

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
    game: {
      started: false,
    }
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
      const idPlayer = room.players.find(({ socketId }) => socket.id === socketId);
      if (idPlayer) {
        room.isFull = false;
        room.players = room.players.filter(id => id !== idPlayer);
        if (!room.players.length) {
          room.game = gameHandler.resetGame();
        }
        io.emit('roomInfo', { totalPlayer: players.length, rooms });
      }
    });
  });

  socket.on('action', ({ type, data }) => {
    switch (type) {
    case 'join': {
      let room = rooms.find(x => x.id === data.roomId);
      if (room && room.players.length < room.maxPlayer) {
        console.log('user join room ', data.name);
        socket.join(`room.${data.roomId}`);
        socket.to(`room.${data.roomId}`).emit('notification', `player ${data.name} has joined`);

        room.players.push({ name: data.name, socketId: socket.id });
        if (room.players.length === room.maxPlayer) {
          room.isFull = true;
        }
        io.to(socket.id).emit('join', room);
        io.to(`room.${data.roomId}`).emit(`room.${data.roomId}.info`, room);
      }
      io.emit('roomInfo', { totalPlayer: players.length, rooms });

      break;
    }
    case 'start': {
      let { roomId } = data;
      const room = rooms.find(x => x.id === roomId);
      //TODO: validate player
      if (room) {
        room.game.started = true;

        // init game
        // io.to init game
        room.game = gameHandler.initGame4player();
        room.players = gameHandler.initTurn(room.players);
        io.to(`room.${data.roomId}`).emit(`room.${data.roomId}.info`, room);
      }
      console.log(`game at room ${room.id} started`);
      break;
    }
    case 'collect_token': {
      // bốc token thường
      /* 
              tokens: {
                COLOR.BLACK: 1,
                COLOR.BLUE: 1,
                COLOR.RED: 1,
              }
              or 
              tokens: {
                COLOR.BLACK: 2,
              }
              */
      if (!gameHandler.validateRoomAndTurn(rooms, socket.id, data.roomId)) return;
      const {
        roomId,
        token
      } = data;
        // get data
      const room = rooms.find(x => x.id === roomId);
      const user = room.players.find(x => x.socketId === socket.id);
      const player = room.game.players[user.turn];
      if (gameHandler.sumToken(player.token) > 10) return;

      let tokenNames = Object.keys(token);
      if (!tokenNames.length) return;
      if (tokenNames[COLOR.GOLD] > 0) return;

      if (tokenNames.length > 3) return;
      if (tokenNames.length > 1) {
        let valid = true;
        tokenNames.forEach(x => {
          if (token[x] > 1) valid = false;
        });
        if (!valid) return;
      }
      if (tokenNames.length == 1 && token[tokenNames[0]] > 2) return;

      // it's ok input, validate table
      let valid = false;
      tokenNames.forEach(color => {
        if (token[color] === 1 && room.game.table.token[color] > 1) valid = true;
        if (token[color] === 2 && room.game.table.token[color] > 3) valid = true;
      });
      if (!valid) return;

      // everything ok, update game
      player.token = gameHandler.addToken(player.token, token);
      room.game.table.token = gameHandler.removeToken(room.game.table.token, token);

      if (gameHandler.sumToken(player.token) > 10) return;

      room.game.currentTurn += 1;
      if (room.game.currentTurn > room.game.players.length) room.game.currentTurn = 1;

      // noti
      io.to(`room.${data.roomId}`).emit(`room.${data.roomId}.info`, room);
      break;
    }
    case 'return_token': {
      const { roomId, token } = data;
      if (!gameHandler.validateRoomAndTurn(rooms, socket.id, data.roomId)) return;
      // get data
      const room = rooms.find(x => x.id === roomId);
      const user = room.players.find(x => x.socketId === socket.id);
      const player = room.game.players[user.turn];

      if (gameHandler.sumToken(player.token) < 10) return;
      if (gameHandler.sumToken(token) <= 0) return;

      // everything ok, update game
      player.token = gameHandler.removeToken(player.token, token);
      room.game.table.token = gameHandler.addToken(room.game.table.token, token);

      // noti
      io.to(`room.${data.roomId}`).emit(`room.${data.roomId}.info`, room);
      break;
    }
    case 'deposit_card': {
      // đặt cọc
      break;
    }
    case 'buy_card': {
      // mua thẻ trên tay hoặc thẻ dưới bàn
      break;
    }
    case 'throw_turn': {
      const { roomId } = data;

      if (!gameHandler.validateRoomAndTurn(rooms, socket.id, data.roomId)) return;
      const room = rooms.find(x => x.id === roomId);
      const user = room.players.find(x => x.socketId === socket.id);
      const player = room.game.players[user.turn];

      if (gameHandler.sumToken(player.token) > 10) return;
      // không làm gì cả, bỏ lượt
      
      room.game.currentTurn += 1;
      if (room.game.currentTurn > Object.keys(room.game.players).length) room.game.currentTurn = 1;
      // noti
      io.to(`room.${data.roomId}`).emit(`room.${data.roomId}.info`, room);

      break;
    }
    default:
      break;
    }


  });
});

http.listen(PORT, () => console.log(`Listening on ${PORT}`));
