
/*global module,require*/
const { COLOR, DUKES, CARD_TABLE } = require('./materials');
const _ = require('lodash');
const { shuffle } = require('./utils');


const initTurn = (players) => {
  let newArr = shuffle(shuffle(players));
  return newArr.map((x, index) => ({
    ...x,
    turn: index + 1,
  }));
};
const initGame4player = () => {
  const newPlayer = {
    token: {
      [COLOR.BLACK]: 0,
      [COLOR.BLUE]: 0,
      [COLOR.GREEN]: 0,
      [COLOR.WHITE]: 0,
      [COLOR.RED]: 0,
      [COLOR.GOLD]: 0,
    },
    cards: [],
    DUKE: []
  };
  let game = {
    started: true,
    table: {
      token: {
        [COLOR.BLACK]: 7,
        [COLOR.BLUE]: 7,
        [COLOR.GREEN]: 7,
        [COLOR.WHITE]: 7,
        [COLOR.RED]: 7,
        [COLOR.GOLD]: 5,
      },
      card_table: {
        up: {
          1: [],
          2: [],
          3: []
        },
        down: {
          1: shuffle(shuffle(shuffle(_.cloneDeep(CARD_TABLE[1])))),
          2: shuffle(shuffle(shuffle(_.cloneDeep(CARD_TABLE[2])))),
          3: shuffle(shuffle(shuffle(_.cloneDeep(CARD_TABLE[3])))),
        }
      },
      duke_table: shuffle(shuffle(DUKES)).slice(0, 5),
    },
    players: {
      1: _.cloneDeep(newPlayer),
      2: _.cloneDeep(newPlayer),
      3: _.cloneDeep(newPlayer),
      4: _.cloneDeep(newPlayer)
    },
    currentTurn: 1,
    round: 1,
  };
  // lật bài
  game.table.card_table.up[1] = game.table.card_table.down[1].splice(0, 4);
  game.table.card_table.up[2] = game.table.card_table.down[2].splice(0, 4);
  game.table.card_table.up[3] = game.table.card_table.down[3].splice(0, 4);

  return game;
};

const resetGame = () => {
  return {
    started: false,
  };
};

const addToken = (curToken, token) => {
  let newToken = { ...curToken };
  Object.keys(token).forEach(color => newToken = { ...newToken, [color]: newToken[color] + token[color] });
  return newToken;
};

const removeToken = (curToken, token) => {
  let newToken = { ...curToken };
  Object.keys(token).forEach(color => newToken = { ...newToken, [color]: newToken[color] - token[color] });
  return newToken;
};

const sumToken = (token) => {
  return Object.keys(token).reduce((agg, item)=> agg+= token[item], 0);
};

const validateRoomAndTurn = (rooms, socketId, roomId) => {
  // get data
  const room = rooms.find(x => x.id === roomId);

  // validate
  if (!room) return;
  if (!room.game.started) return;
  
  const user = room.players.find(x => x.socketId === socketId);
  const player = room.game.players[user.turn];
  if (!player) return;
  if (user.turn !== room.game.currentTurn) return;
  return true;
};


module.exports = {
  initGame4player,
  resetGame,
  initTurn,
  addToken,
  removeToken,
  sumToken,
  validateRoomAndTurn,
};