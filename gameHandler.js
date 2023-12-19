
/*global */
const { COLOR, DUKES, CARD_TABLE } = require('./materials');
const _ = require('lodash');
const { shuffle } = require('./utils');
const { cloneDeep } = require('lodash');
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
  dukes: [],
  pv: 0,
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
    finished: false,
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
      dukes: shuffle(shuffle(DUKES)).slice(0, 5),
    },
    players: {
      1: _.cloneDeep(NEW_PLAYER),
      2: _.cloneDeep(NEW_PLAYER),
      3: _.cloneDeep(NEW_PLAYER),
      4: _.cloneDeep(NEW_PLAYER)
    },
    currentTurn: 1,
    round: 1,
    winners: []
  };
  // lật bài
  game.table.card_table.up[1] = game.table.card_table.down[1].splice(0, 4);
  game.table.card_table.up[2] = game.table.card_table.down[2].splice(0, 4);
  game.table.card_table.up[3] = game.table.card_table.down[3].splice(0, 4);


  if (numberPlayer === 3) {
    [COLOR.BLACK, COLOR.BLUE, COLOR.GREEN, COLOR.RED, COLOR.WHITE].forEach(color => game.table.token[color] = 5);
    game.table.dukes = game.table.dukes.splice(0, 4);
    delete game.players[4];
  }

  if (numberPlayer === 2) {
    [COLOR.BLACK, COLOR.BLUE, COLOR.GREEN, COLOR.RED, COLOR.WHITE].forEach(color => game.table.token[color] = 4);
    game.table.dukes = game.table.dukes.splice(0, 3);
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
  return Object.keys(token).reduce((agg, item) => agg += token[item], 0);
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


const getDukeFromCards = (dukes, cards) => {
  const dukeAccept = dukes.filter(duke => {
    let valid = true;
    Object.keys(duke.price).forEach(color => {
      const colorCards = cards.filter(x => x.property === color);
      if (colorCards.length < duke.price[color]) valid = false;
    });
    return valid;
  });
  return dukeAccept[0];
};

const calculateToFinishGame = game => {
  let newGame = cloneDeep(game);
  let winners = [];
  let bestPointValue = 0;
  let minCard = 100;
  let minDepositCard = 100;
  Object.keys(newGame.players).forEach(turn => {
    newGame.players[turn].pv = 0;
    newGame.players[turn].pv += newGame.players[turn].cards.reduce((pv, card) => pv += card.pv, 0);
    newGame.players[turn].pv += newGame.players[turn].dukes.reduce((pv, duke) => pv += duke.pv, 0);
    if (newGame.players[turn].pv >= 15) {
      winners.push(turn);
      if (newGame.players[turn].pv > bestPointValue) bestPointValue = newGame.players[turn].pv;
      if (newGame.players[turn].cards.length < minCard) {
        minCard = newGame.players[turn].cards.length;
      }
      if (newGame.players[turn].deposit_cards.length < minDepositCard) {
        minDepositCard = newGame.players[turn].deposit_cards.length;
      }

    }
  });
  if (newGame.currentTurn !== 1) return newGame;
  if (winners.length > 1) {
    winners = winners.filter(turn => newGame.players[turn].pv === bestPointValue);
    if (winners.length > 1) {
      winners = winners.filter(turn => newGame.players[turn].cards.length === minCard);
      if (winners.length > 1) {
        winners = winners.filter(turn => newGame.players[turn].deposit_cards.length === minDepositCard);
      }
    }
  }
  if (winners.length) {
    newGame.finished = true;
    newGame.winners = winners;
  }
  return newGame;

};

const givenTokenFromBuying = (priceToken, player) => {
  return Object.keys(priceToken).reduce((givenToken, color) => {
    if(!priceToken[color]) return givenToken;
    const cards = player.cards.filter(card => card.property === color);
    const numberToken = (priceToken[color] - cards.length)
    if(numberToken <= 0) return givenToken;
    if(numberToken > player.token[color]) {
      givenToken['gold'] = (givenToken['gold'] || 0) + numberToken - player.token[color];
      givenToken[color] = player.token[color];
    } else {
      givenToken[color] = numberToken;
    }
    return givenToken;
  }, {});
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
  getDukeFromCards,
  calculateToFinishGame,
  givenTokenFromBuying,
};