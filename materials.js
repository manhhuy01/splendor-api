/*global module*/
const COLOR = {
  WHITE: 'white',
  BLUE: 'blue',
  GREEN: 'green',
  RED: 'red',
  BLACK: 'black',
  GOLD: 'gold'
};

const CARDS = {
  1: {
    id: 1,
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 1,
    },
    image: '1_black_1_1_1_1'
  },
  2: {
    id: 2,
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 1,
    },
    image: '1_black_1_2_1_1',
  },
  3: {
    id: 3,
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.BLUE]: 2,
      [COLOR.RED]: 1,
    },
    image: '1_black_2_2_1'
  },
  4: {
    id: 4,
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 3,
      [COLOR.BLACK]: 1,
    },
    image: '1_black_1_3_1'
  },
  5: {
    id: 5,
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.GREEN]: 2,
      [COLOR.RED]: 1,
    },
    image: '1_black_2_1'
  },
  41: {
    id: 41,
    property: COLOR.BLACK,
    pv: 1,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 2,
    },
    image: '2_black_3_2_2'
  },
  42: {
    id: 42,
    property: COLOR.BLACK,
    pv: 1,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.GREEN]: 3,
      [COLOR.BLACK]: 2,

    },
    image: '2_black_3_3_2'
  },
  43: {
    id: 43,
    property: COLOR.BLACK,
    pv: 2,
    price: {
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 4,
      [COLOR.RED]: 2,
    },
    image: '2_black_1_4_2'
  },
  44: {
    id: 44,
    property: COLOR.BLACK,
    pv: 2,
    price: {
      [COLOR.GREEN]: 5,
      [COLOR.RED]: 3,
    },
    image: '2_black_5_3'
  },
  45: {
    id: 45,
    property: COLOR.BLACK,
    pv: 2,
    price: {
      [COLOR.WHITE]: 5,
    },
    image: '2_black_5'
  },
  71: {
    id: 71,
    property: COLOR.BLACK,
    pv: 3,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.GREEN]: 5,
      [COLOR.RED]: 3,
    },
    image: '3_black_3_3_5_3'
  },
  72: {
    id: 72,
    property: COLOR.BLACK,
    pv: 4,
    price: {
      [COLOR.RED]: 7,
    },
    image: '3_black_7'
  },
  73: {
    id: 73,
    property: COLOR.BLACK,
    pv: 4,
    price: {
      [COLOR.GREEN]: 3,
      [COLOR.RED]: 6,
      [COLOR.BLACK]: 3,
    },
    image: '3_black_3_6_3'
  },
  74: {
    id: 74,
    property: COLOR.BLACK,
    pv: 5,
    price: {
      [COLOR.RED]: 7,
      [COLOR.BLACK]: 3,
    },
    image: '3_black_7_3'
  },
  75: {
    id: 75,
    property: COLOR.BLUE,
    pv: 3,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.GREEN]: 3,
      [COLOR.RED]: 3,
      [COLOR.BLACK]: 5,
    },
    image: '3_blue_3_3_3_5'
  }
};
const CARD_TABLE = {
  1: [CARDS[1], CARDS[2], CARDS[3], CARDS[4], CARDS[5]],
  2: [CARDS[41], CARDS[42], CARDS[43], CARDS[44], CARDS[45]],
  3: [CARDS[71], CARDS[72], CARDS[73], CARDS[74], CARDS[75]],
};

const DUKE = {
  1: {
    id: 1,
    pv: 3,
    price: {
      [COLOR.WHITE]: 4,
      [COLOR.BLACK]: 4,
    },
    image: 'ct_0'
  },
  2: {
    id: 2,
    pv: 3,
    price: {
      [COLOR.WHITE]: 4,
      [COLOR.BLUE]: 4,
    },
    image: 'ct_5'

  },
  3: {
    id: 3,
    pv: 3,
    price: {
      [COLOR.RED]: 4,
      [COLOR.BLACK]: 4,
    },
    image: 'ct_4'

  },
  4: {
    id: 4,
    pv: 3,
    price: {
      [COLOR.RED]: 4,
      [COLOR.GREEN]: 4,
    },
    image: 'ct_2'
  },
  5: {
    id: 5,
    pv: 3,
    price: {
      [COLOR.BLUE]: 4,
      [COLOR.GREEN]: 4,
    },
    image: 'ct_6'
  },
  6: {
    id: 6,
    pv: 3,
    price: {
      [COLOR.RED]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.GREEN]: 3,
    },
    image: 'ct_3',
  },
  7: {
    id: 7,
    pv: 3,
    price: {
      [COLOR.BLACK]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.WHITE]: 3,
    },
    image: 'ct_9'
  },
  8: {
    id: 8,
    pv: 3,
    price: {
      [COLOR.BLACK]: 3,
      [COLOR.RED]: 3,
      [COLOR.GREEN]: 3,
    },
    image: 'ct_8'
  },
  9: {
    id: 9,
    pv: 3,
    price: {
      [COLOR.GREEN]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.WHITE]: 3,
    },
    image: 'ct_1'
  },
  10: {
    id: 10,
    pv: 3,
    price: {
      [COLOR.RED]: 3,
      [COLOR.BLACK]: 3,
      [COLOR.WHITE]: 3,
    },
    image: 'ct_7'
  },

};

const DUKES = [DUKE[1], DUKE[2], DUKE[3], DUKE[4], DUKE[5], DUKE[6], DUKE[7], DUKE[8], DUKE[9], DUKE[10]];

const getLevelCard = cardId => {
  if(cardId < 41) return 1;
  if(cardId < 71) return 2;
  if(cardId < 91) return 3;
  return undefined;
};

module.exports = {
  COLOR,
  CARD_TABLE,
  CARDS,
  DUKES,
  getLevelCard,
};