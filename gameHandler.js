
/*global module,require*/
const { COLOR, DUKES, CARD_TABLE } = require('./materials');
const _ = require('lodash');
const { shuffle } = require('./utils');
const NEW_PLAYER = {
  token: {
    [COLOR.BLACK]: 0,
    [COLOR.BLUE]: 0,
    [COLOR.GREEN]: 0,
    [COLOR.WHITE]: 0,
    [COLOR.RED]: 0,
    [COLOR.GOLD]: 0,
  },
  cards: [],
  deposit_cards: [],
  duke: []
};

const initTurn = (players) => {
  let newArr = shuffle(shuffle(players));
  return newArr.map((x, index) => ({
    ...x,
    turn: index + 1,
  }));
};
const initGame = (numberPlayer) => {
  
  let game = {
    started: true,
    table: {
      token: {
        [COLOR.WHITE]: 7,
        [COLOR.BLUE]: 7,
        [COLOR.GREEN]: 7,
        [COLOR.RED]: 7,
        [COLOR.BLACK]: 7,
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
      1: _.cloneDeep(NEW_PLAYER),
      2: _.cloneDeep(NEW_PLAYER),
      3: _.cloneDeep(NEW_PLAYER),
      4: _.cloneDeep(NEW_PLAYER)
    },
    currentTurn: 1,
    round: 1,
  };
  // lật bài
  game.table.card_table.up[1] = game.table.card_table.down[1].splice(0, 4);
  game.table.card_table.up[2] = game.table.card_table.down[2].splice(0, 4);
  game.table.card_table.up[3] = game.table.card_table.down[3].splice(0, 4);


  if(numberPlayer === 3){
    [COLOR.BLACK, COLOR.BLUE, COLOR.GREEN, COLOR.RED, COLOR.WHITE].forEach(color => game.table.token[color] = 5);
    game.table.duke_table = game.table.duke_table.splice(0, 4);
    delete game.players[4];
  }

  if(numberPlayer === 2){
    [COLOR.BLACK, COLOR.BLUE, COLOR.GREEN, COLOR.RED, COLOR.WHITE].forEach(color => game.table.token[color] = 4);
    game.table.duke_table = game.table.duke_table.splice(0, 3);
    delete game.players[4];
    delete game.players[3];
  }


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

const nextTurn = (game) => {
  let turn = game.currentTurn + 1;
  if (turn > Object.keys(game.players).length) turn = 1;
  return turn;
};

module.exports = {
  initGame,
  resetGame,
  initTurn,
  addToken,
  removeToken,
  sumToken,
  validateRoomAndTurn,
  nextTurn,
};