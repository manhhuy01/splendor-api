// eslint-disable-next-line no-undef
/*global process*/

const gameHandler = require('./gameHandler');
const { CARDS } = require('./materials');
const PORT = process.env.PORT || 5001;

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
const materials = require('./materials');
const { cloneDeep } = require('lodash');

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
    },
    messages: [],
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
          room.messages = [];
        }
        io.emit('roomInfo', { totalPlayer: players.length, rooms });
      }
    });
  });

  socket.on('action', ({ type, data }) => {
    switch (type) {
      case 'join': {
        let room = rooms.find(x => x.id === data.roomId);
        if (room && (room.players.length < room.maxPlayer || room.game.started)) {
          console.log('user join room ', data.name);
          socket.join(`room.${data.roomId}`);
          socket.to(`room.${data.roomId}`).emit('notification', `player ${data.name} has joined`);

          room.players.push({ name: data.name, socketId: socket.id });
          if (room.players.length === room.maxPlayer) {
            room.isFull = true;
          }

          // thế chỗ
          if (room.game.started) {
            [1, 2, 3, 4].forEach(turn => {
              if (room.game.players[turn] && !room.players.find(x => x.turn === turn)) {
                const newPlayer = room.players.find(x => x.socketId === socket.id);
                newPlayer.turn = turn;
                return;
              }
            });
          }

          io.to(socket.id).emit('join', room);
          io.to(`room.${data.roomId}`).emit(`room.${data.roomId}.info`, room);
        }
        io.emit('roomInfo', { totalPlayer: players.length, rooms });

        break;
      }
      default:
        break;
    }
  });
  socket.on('chat', ({ roomId, text }) => {
    const room = rooms.find(x => x.id === roomId);
    if (room) {
      const player = room.players.find(x => x.socketId === socket.id);
      if (player && player.name) {
        if (room.messages.length > 20) {
          room.messages = [...room.messages.splice(1, 20),];
        }
        room.messages = [...room.messages, { text, name: player.name, socketId: socket.id }];
        io.to(`room.${roomId}`).emit(`room.${roomId}.chat`, room);
      }

    }
  });
});

const sendBadRequest = (req, res, mes = 'Lỗi gì chưa rảnh ghi') => {
  let { roomId } = req.body;
  const room = rooms.find(x => x.id === roomId);
  io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  res.status(400).send({ error: mes });
};

const sendOkRequest = res => {
  res.status(200).send({});
};

app.post('/start', (req, res) => {
  let { roomId, numOfPlayer = 4 } = req.body;
  const room = rooms.find(x => x.id === roomId);
  //TODO: validate player
  if (room.players.length < 2) return sendBadRequest(req,res, 'một mình chơi với dế à?');
  if (room.players.length > 4) return sendBadRequest(req,res, 'đông quá rồi');
  if (room) {
    room.game.started = true;

    // init game
    // io.to init game
    room.game = gameHandler.initGame(numOfPlayer);
    room.players = gameHandler.initTurn(room.players);
    io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  }
  return sendOkRequest(res);
});

app.post('/reset', (req, res) => {
  let { roomId } = req.body;
  const room = rooms.find(x => x.id === roomId);
  //TODO: validate player
  if (room) {
    room.game.started = false;
    io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  }
  // reset hết mẻ lun 
  players = [];
  rooms = [
    {
      id: 1,
      maxPlayer: 4,
      players: [],
      isFull: false,
      game: {
        started: false,
      },
      messages: [],
    }
  ];
  return sendOkRequest(res);
});

app.post('/collect_token', (req, res) => {
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

  const { socketId, roomId, token } = req.body;

  if (!gameHandler.validateRoomAndTurn(rooms, socketId, roomId)) return sendBadRequest(res);

  // get data
  const room = rooms.find(x => x.id === roomId);
  const user = room.players.find(x => x.socketId === socketId);
  const player = room.game.players[user.turn];
  if (gameHandler.sumToken(player.token) > 10) return sendBadRequest(req,res, 'Dư mà còn bốc');

  let tokenNames = Object.keys(token);
  let tokenValues = Object.values(token).filter(value => value > 0);
  if (!tokenNames.length) return sendBadRequest(res);
  if (token[COLOR.GOLD] > 0) return sendBadRequest(req,res, 'Mày điên à đi bốc gold');

  if (tokenValues.length > 3) return sendBadRequest(req,res, 'Bốc cho cố vào');
  if (tokenValues.length > 1) {
    let valid = true;
    tokenNames.forEach(x => {
      if (token[x] > 1) valid = false;
    });
    if (!valid) return sendBadRequest(req,res, 'Bốc cho cố vào');
  }
  if (tokenValues.length == 1 && tokenValues[0] > 2) return sendBadRequest(req,res, 'Bốc 2 cái thôi cha');

  // it's ok input, validate table
  let valid = false;
  tokenNames.forEach(color => {
    if (token[color] === 1 && room.game.table.token[color] > 0) valid = true;
    if (token[color] === 2 && room.game.table.token[color] > 3) valid = true;
  });
  if (!valid) return sendBadRequest(req,res, 'Nhìn số lượng token trên bàn cho kĩ vô');

  // everything ok, update game
  player.token = gameHandler.addToken(player.token, token);
  room.game.table.token = gameHandler.removeToken(room.game.table.token, token);

  if (gameHandler.sumToken(player.token) <= 10) {
    room.game.currentTurn = gameHandler.nextTurn(room.game);
    room.game = gameHandler.calculateToFinishGame(room.game);
  }

  // noti
  io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  return sendOkRequest(res);
});

app.post('/return_token', (req, res) => {
  const { roomId, token, socketId } = req.body;
  if (!gameHandler.validateRoomAndTurn(rooms, socketId, roomId)) return sendBadRequest(res);
  // get data
  const room = rooms.find(x => x.id === roomId);
  const user = room.players.find(x => x.socketId === socketId);
  const player = room.game.players[user.turn];

  if (gameHandler.sumToken(player.token) < 10) return sendBadRequest(req,res, 'token nhỏ hơn 10 mới trả');
  if (gameHandler.sumToken(token) <= 0) return sendBadRequest(req,res, 'token âm cmnl rồi');

  // everything ok, update game
  player.token = gameHandler.removeToken(player.token, token);
  room.game.table.token = gameHandler.addToken(room.game.table.token, token);
  if (gameHandler.sumToken(player.token) > 10) return sendBadRequest(req,res, 'nhả cho hết coi');

  room.game.currentTurn = gameHandler.nextTurn(room.game);
  room.game = gameHandler.calculateToFinishGame(room.game);
  // noti
  io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  return sendOkRequest(res);
});


app.post('/throw_turn', (req, res) => {
  const { socketId, roomId } = req.body;

  if (!gameHandler.validateRoomAndTurn(rooms, socketId, roomId)) return sendBadRequest(res);
  const room = rooms.find(x => x.id === roomId);
  const user = room.players.find(x => x.socketId === socketId);
  const player = room.game.players[user.turn];

  if (gameHandler.sumToken(player.token) > 10) return sendBadRequest(req,res, 'Dư token không định trả à?');
  // không làm gì cả, bỏ lượt

  room.game.currentTurn = gameHandler.nextTurn(room.game);
  room.game = gameHandler.calculateToFinishGame(room.game);
  // noti
  io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  return sendOkRequest(res);
});

app.post('/deposit_card', (req, res) => {
  const { socketId, roomId } = req.body;

  if (!gameHandler.validateRoomAndTurn(rooms, socketId, roomId)) return sendBadRequest(res);
  const room = rooms.find(x => x.id === roomId);
  const user = room.players.find(x => x.socketId === socketId);
  const player = room.game.players[user.turn];

  if (gameHandler.sumToken(player.token) > 10) return sendBadRequest(req,res, 'Dư token không định trả à?');

  if (player.deposit_cards.length >= 3) return sendBadRequest(res);

  const { deposit_card_id, deposit_card_level } = req.body;
  const { game } = room;
  if (deposit_card_id) {
    let level = materials.getLevelCard(deposit_card_id);
    if (!level) return sendBadRequest(res);

    let card = game.table.card_table.up[level].find(c => c.id === deposit_card_id);
    if (!card) return sendBadRequest(res);

    game.table.card_table.up[level] = game.table.card_table.up[level].filter(x => x.id !== deposit_card_id);
    if (game.table.card_table.down[level].length) {
      game.table.card_table.up[level].push(game.table.card_table.down[level].shift());
    }
    player.deposit_cards.push(card);
    if (game.table.token[COLOR.GOLD]) {
      player.token[COLOR.GOLD] += 1;
      game.table.token[COLOR.GOLD] -= 1;
    }

  } else {
    if (deposit_card_level > 3 || deposit_card_level < 1) return sendBadRequest(res);
    let card = game.table.card_table.down[deposit_card_level].shift();
    player.deposit_cards.push(card);
    if (game.table.token[COLOR.GOLD]) {
      player.token[COLOR.GOLD] += 1;
      game.table.token[COLOR.GOLD] -= 1;
    }
  }

  if (gameHandler.sumToken(player.token) <= 10) {
    room.game.currentTurn = gameHandler.nextTurn(room.game);
    room.game = gameHandler.calculateToFinishGame(room.game);
  }

  // noti
  io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  return sendOkRequest(res);
});

app.post('/buy_card', (req, res) => {
  const { socketId, roomId } = req.body;

  if (!gameHandler.validateRoomAndTurn(rooms, socketId, roomId)) return sendBadRequest(res);
  const room = rooms.find(x => x.id === roomId);
  const user = room.players.find(x => x.socketId === socketId);
  const player = room.game.players[user.turn];
  const token = player.token;

  if (gameHandler.sumToken(player.token) > 10) return sendBadRequest(req,res, 'Dư token không định trả à?');
  // truyền lên token để mua 1 cách đầy đủ trừ card
  const { card_id } = req.body;
  const { game } = room;

  const validatePlayerEnoughToBuyCard = (card, tokenToBuy) => {
    return Object.keys(card.price).reduce((newToken, color) => {
      if (!newToken) return newToken;
      const cardWithColor = player.cards.filter(x => x.property === color);
      if (card.price[color] <= cardWithColor.length) return newToken;

      const tokenWithColor = tokenToBuy[color] || 0;
      if (card.price[color] <= cardWithColor.length + tokenWithColor) return newToken;

      const tokenGold = tokenToBuy[COLOR.GOLD] || 0;
      if (!tokenGold) return undefined;
      if (card.price[color] <= cardWithColor.length + tokenWithColor + tokenGold) {
        newToken[COLOR.GOLD] -= (card.price[color] - cardWithColor.length - tokenWithColor);
        if (newToken[COLOR.GOLD] < 0) return undefined;
        return newToken;
      }
      return newToken;
    }, cloneDeep(tokenToBuy));
  };

  const removeTokenFromBuying = (tokenToBuy, player) => {
    return Object.keys(tokenToBuy).reduce((newToken, color) => {
      newToken[color] -= tokenToBuy[color]
      return newToken;
    }, cloneDeep(player.token));
  };

  const givenTokenFromBuying = (priceToken, player) => {
    return Object.keys(priceToken).reduce((givenToken, color) => {
      if(!priceToken[color]) return givenToken;
      const cards = player.cards.filter(card => card.property === color);
      const numberToken = (priceToken[color] - cards.length)
      if(numberToken > player.token[color]) {
        givenToken['gold'] = (givenToken['gold'] || 0) + numberToken - player.token[color];
      } else {
        givenToken[color] = numberToken;
      }
      return givenToken;
    }, {});
  };

  const validateTokenBuyFromPlayerToken = () => Object.keys(token).reduce((rs, color) => {
    if (token[color] > player.token[color]) rs = false;
    return rs;
  }, true);

  if (!validateTokenBuyFromPlayerToken()) return sendBadRequest(req,res, 'token mua nhiều hơn token có, hack à?');

  let level = materials.getLevelCard(card_id);
  if (!level) return sendBadRequest(res);

  let card = CARDS[card_id];
  if (!card) return sendBadRequest(req,res, 'mua card bậy bạ');
  if (!validatePlayerEnoughToBuyCard(card, token)) return sendBadRequest(req,res, 'Không đủ token để mua');

  // coi thử mua trên bàn hay không
  card = game.table.card_table.up[level].find(c => c.id === card_id);



  if (card) {
    game.table.card_table.up[level] = game.table.card_table.up[level].filter(x => x.id !== card_id);
    if (game.table.card_table.down[level].length) {
      game.table.card_table.up[level].push(game.table.card_table.down[level].shift());
    }
    const givenToken = givenTokenFromBuying(card.price, player);
    const newToken = removeTokenFromBuying(givenToken, player);
    if (!newToken) return sendBadRequest(req,res, 'Giao dịch thất bại');
    player.token = newToken;
    player.cards.push(card);
    room.game.table.token = gameHandler.addToken(room.game.table.token, givenToken);
  } else {
    card = player.deposit_cards.find(x => x.id === card_id);
    if (!card) return sendBadRequest(req,res, 'mua bài không có trên tay');
    // mua từ bài deposit
    const givenToken = givenTokenFromBuying(card.price, player);
    const newToken = removeTokenFromBuying(givenToken, player);
    if (!newToken) return sendBadRequest(req,res, 'giao dịch thất bại');
    player.token = newToken;
    player.cards.push(card);
    player.deposit_cards = player.deposit_cards.filter(x => x.id !== card.id);
    room.game.table.token = gameHandler.addToken(room.game.table.token, givenToken);
  }


  // check trigger duke.
  let duke = gameHandler.getDukeFromCards(game.table.dukes, player.cards);
  if (duke) {
    player.dukes.push(duke);
    game.table.dukes = game.table.dukes.filter(x => x.id !== duke.id);
  }

  room.game.currentTurn = gameHandler.nextTurn(room.game);
  room.game = gameHandler.calculateToFinishGame(room.game);
  // noti
  io.to(`room.${roomId}`).emit(`room.${roomId}.info`, room);
  return sendOkRequest(res);
});

http.listen(PORT, () => console.log(`Listening on ${PORT}`));
