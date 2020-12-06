/*global module*/
const COLOR = {
  BLACK: 'k',
  RED: 'r',
  GREEN: 'g',
  BLUE: 'u',
  WHITE: 'w',
  GOLD: 'd'
};

const CARDS = {
  1: {
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 1,
    }
  },
  2: {
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 1,
    }
  },
  3: {
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.BLUE]: 2,
      [COLOR.RED]: 1,
    }
  },
  4: {
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.GREEN]: 1,
      [COLOR.BLACK]: 2,
      [COLOR.RED]: 3,
    }
  },
  5: {
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.GREEN]: 2,
      [COLOR.RED]: 1,
    }
  },
  41: {
    property: COLOR.BLACK,
    pv: 1,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 2,
    }
  },
  42: {
    property: COLOR.BLACK,
    pv: 1,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLACK]: 2,
      [COLOR.GREEN]: 3,
    }
  },
  43: {
    property: COLOR.BLACK,
    pv: 2,
    price: {
      [COLOR.BLUE]: 1,
      [COLOR.RED]: 2,
      [COLOR.GREEN]: 4,
    }
  },
  44: {
    property: COLOR.BLACK,
    pv: 2,
    price: {
      [COLOR.RED]: 3,
      [COLOR.GREEN]: 5,
    }
  },
  45: {
    property: COLOR.BLACK,
    pv: 2,
    price: {
      [COLOR.WHITE]: 5,
    }
  },
  71: {
    property: COLOR.BLACK,
    pv: 3,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.GREEN]: 5,
      [COLOR.RED]: 3,
    }
  },
  72: {
    property: COLOR.BLACK,
    pv: 4,
    price: {
      [COLOR.RED]: 7,
    }
  },
  73: {
    property: COLOR.BLACK,
    pv: 4,
    price: {
      [COLOR.GREEN]: 3,
      [COLOR.RED]: 6,
      [COLOR.BLACK]: 3,
    }
  },
  74: {
    property: COLOR.BLACK,
    pv: 5,
    price: {
      [COLOR.RED]: 7,
      [COLOR.BLACK]: 3,
    }
  },
  75: {
    property: COLOR.BLUE,
    pv: 3,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.GREEN]: 3,
      [COLOR.RED]: 3,
      [COLOR.BLACK]: 5,
    }
  }
};
const CARD_TABLE = {
  1: [CARDS[1], CARDS[2], CARDS[3], CARDS[4], CARDS[5]],
  2: [CARDS[41], CARDS[42], CARDS[43], CARDS[44], CARDS[45]],
  3: [CARDS[71], CARDS[72], CARDS[73], CARDS[74], CARDS[75]],
};

const DUKE = {
  1: {
    pv: 3,
    price: {
      [COLOR.WHITE]: 4,
      [COLOR.BLACK]: 4,
    }
  },
  2: {
    pv: 3,
    price: {
      [COLOR.WHITE]: 4,
      [COLOR.BLUE]: 4,
    }

  },
  3: {
    pv: 3,
    price: {
      [COLOR.RED]: 4,
      [COLOR.BLUE]: 4,
    }

  },
  4: {
    pv: 3,
    price: {
      [COLOR.RED]: 4,
      [COLOR.GREEN]: 4,
    }
  },
  5: {
    pv: 3,
    price: {
      [COLOR.BLUE]: 4,
      [COLOR.GREEN]: 4,
    }
  },
  6: {
    pv: 3,
    price: {
      [COLOR.RED]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.GREEN]: 3,
    }
  },
  7: {
    pv: 3,
    price: {
      [COLOR.BLACK]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.WHITE]: 3,
    }
  },
  8: {
    pv: 3,
    price: {
      [COLOR.BLACK]: 3,
      [COLOR.RED]: 3,
      [COLOR.GREEN]: 3,
    }
  },
  9: {
    pv: 3,
    price: {
      [COLOR.GREEN]: 3,
      [COLOR.BLUE]: 3,
      [COLOR.WHITE]: 3,
    }
  },
  10: {
    pv: 3,
    price: {
      [COLOR.RED]: 3,
      [COLOR.BLACK]: 3,
      [COLOR.WHITE]: 3,
    }
  },

};

const DUKES = [DUKE[1], DUKE[2], DUKE[3], DUKE[4], DUKE[5], DUKE[6], DUKE[7], DUKE[8], DUKE[9], DUKE[10]];

module.exports = {
  COLOR,
  CARD_TABLE,
  CARDS,
  DUKES,
};