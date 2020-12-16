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
  6: {
    id: 6,
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.GREEN]: 2,
    },
    image: '1_black_2_2'
  },
  7: {
    id: 7,
    property: COLOR.BLACK,
    pv: 0,
    price: {
      [COLOR.GREEN]: 3,
    },
    image: '1_black_3'
  },
  8: {
    id: 8,
    property: COLOR.BLACK,
    pv: 1,
    price: {
      [COLOR.BLUE]: 4,
    },
    image: '1_black_4'
  },
  9: {
    id: 9,
    property: COLOR.BLUE,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 1,
      [COLOR.BLACK]: 1,
    },
    image: '1_blue_1_1_1_1'
  },
  10: {
    id: 10,
    property: COLOR.BLUE,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 2,
      [COLOR.BLACK]: 1,
    },
    image: '1_blue_1_1_2_1'
  },
  11: {
    id: 11,
    property: COLOR.BLUE,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.GREEN]: 2,
      [COLOR.RED]: 2,
    },
    image: '1_blue_1_2_2'
  },
  12: {
    id: 12,
    property: COLOR.BLUE,
    pv: 0,
    price: {
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 3,
      [COLOR.RED]: 1,
    },
    image: '1_blue_1_3_1'
  },
  13: {
    id: 13,
    property: COLOR.BLUE,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLACK]: 2,
    },
    image: '1_blue_1_2'
  },
  14: {
    id: 14,
    property: COLOR.BLUE,
    pv: 0,
    price: {
      [COLOR.GREEN]: 2,
      [COLOR.BLACK]: 2,
    },
    image: '1_blue_2_2'
  },
  15: {
    id: 15,
    property: COLOR.BLUE,
    pv: 0,
    price: {
      [COLOR.BLACK]: 3,
    },
    image: '1_blue_3'
  },
  16: {
    id: 16,
    property: COLOR.BLUE,
    pv: 1,
    price: {
      [COLOR.RED]: 4,
    },
    image: '1_blue_4'
  },
  17: {
    id: 17,
    property: COLOR.WHITE,
    pv: 0,
    price: {
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 1,
      [COLOR.BLACK]: 1,
    },
    image: '1_white_1_1_1_1'
  },
  18: {
    id: 18,
    property: COLOR.WHITE,
    pv: 0,
    price: {
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 2,
      [COLOR.RED]: 1,
      [COLOR.BLACK]: 1,
    },
    image: '1_white_1_2_1_1'
  },
  19: {
    id: 19,
    property: COLOR.WHITE,
    pv: 0,
    price: {
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 2,
      [COLOR.BLACK]: 1,
    },
    image: '1_white_2_2_1'
  },
  20: {
    id: 20,
    property: COLOR.WHITE,
    pv: 0,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLUE]: 1,
      [COLOR.BLACK]: 1,
    },
    image: '1_white_3_1_1'
  },
  21: {
    id: 21,
    property: COLOR.WHITE,
    pv: 0,
    price: {
      [COLOR.RED]: 2,
      [COLOR.BLACK]: 1,
    },
    image: '1_white_2_1'
  },
  22: {
    id: 22,
    property: COLOR.WHITE,
    pv: 0,
    price: {
      [COLOR.BLUE]: 2,
      [COLOR.BLACK]: 2,
    },
    image: '1_white_2_2'
  },
  23: {
    id: 23,
    property: COLOR.WHITE,
    pv: 0,
    price: {
      [COLOR.BLUE]: 3,
    },
    image: '1_white_3'
  },
  24: {
    id: 24,
    property: COLOR.WHITE,
    pv: 1,
    price: {
      [COLOR.GREEN]: 4,
    },
    image: '1_white_4'
  },
  25: {
    id: 25,
    property: COLOR.GREEN,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 1,
      [COLOR.RED]: 1,
      [COLOR.BLACK]: 1,
    },
    image: '1_green_1_1_1_1'
  },
  26: {
    id: 26,
    property: COLOR.GREEN,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 1,
      [COLOR.RED]: 1,
      [COLOR.BLACK]: 2,
    },
    image: '1_green_1_1_1_2'
  },
  27: {
    id: 27,
    property: COLOR.GREEN,
    pv: 0,
    price: {
      [COLOR.BLUE]: 1,
      [COLOR.RED]: 2,
      [COLOR.BLACK]: 2,
    },
    image: '1_green_1_2_2'
  },
  28: {
    id: 28,
    property: COLOR.GREEN,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 3,
      [COLOR.GREEN]: 1,
    },
    image: '1_green_1_3_1'
  },
  29: {
    id: 29,
    property: COLOR.GREEN,
    pv: 0,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.BLUE]: 1,
    },
    image: '1_green_2_1'
  },
  30: {
    id: 30,
    property: COLOR.GREEN,
    pv: 0,
    price: {
      [COLOR.BLUE]: 2,
      [COLOR.RED]: 2,
    },
    image: '1_green_2_2'
  },
  31: {
    id: 31,
    property: COLOR.GREEN,
    pv: 0,
    price: {
      [COLOR.RED]: 3,
    },
    image: '1_green_3'
  },
  32: {
    id: 32,
    property: COLOR.GREEN,
    pv: 1,
    price: {
      [COLOR.BLACK]: 4,
    },
    image: '1_green_4'
  },
  33: {
    id: 33,
    property: COLOR.RED,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 1,
      [COLOR.BLACK]: 1,
    },
    image: '1_red_1_1_1_1'
  },
  34: {
    id: 34,
    property: COLOR.RED,
    pv: 0,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.BLUE]: 1,
      [COLOR.GREEN]: 1,
      [COLOR.BLACK]: 1,
    },
    image: '1_red_2_1_1_1'
  },
  35: {
    id: 35,
    property: COLOR.RED,
    pv: 0,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.GREEN]: 1,
      [COLOR.BLACK]: 2,
    },
    image: '1_red_2_1_2'
  },
  36: {
    id: 36,
    property: COLOR.RED,
    pv: 0,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.RED]: 1,
      [COLOR.BLACK]: 3,
    },
    image: '1_red_1_1_3'
  },
  37: {
    id: 37,
    property: COLOR.RED,
    pv: 0,
    price: {
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 1,
    },
    image: '1_red_2_1'
  },
  38: {
    id: 38,
    property: COLOR.RED,
    pv: 0,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.RED]: 2,
    },
    image: '1_red_2_2'
  },
  39: {
    id: 39,
    property: COLOR.RED,
    pv: 0,
    price: {
      [COLOR.WHITE]: 3,
    },
    image: '1_red_3'
  },
  40: {
    id: 40,
    property: COLOR.RED,
    pv: 1,
    price: {
      [COLOR.WHITE]: 4,
    },
    image: '1_red_4'
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
  46: {
    id: 46,
    property: COLOR.BLACK,
    pv: 3,
    price: {
      [COLOR.BLACK]: 6,
    },
    image: '2_black_6'
  },
  47: {
    id: 47,
    property: COLOR.BLUE,
    pv: 1,
    price: {
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 2,
      [COLOR.RED]: 3,
    },
    image: '2_blue_2_2_3'
  },
  48: {
    id: 48,
    property: COLOR.BLUE,
    pv: 1,
    price: {
      [COLOR.BLUE]: 2,
      [COLOR.GREEN]: 3,
      [COLOR.BLACK]: 3,
    },
    image: '2_blue_2_3_3'
  },
  49: {
    id: 49,
    property: COLOR.BLUE,
    pv: 2,
    price: {
      [COLOR.WHITE]: 5,
      [COLOR.BLUE]: 3,
    },
    image: '2_blue_5_3'
  },
  50: {
    id: 50,
    property: COLOR.BLUE,
    pv: 2,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.RED]: 1,
      [COLOR.BLACK]: 4,
    },
    image: '2_blue_2_1_4'
  },
  51: {
    id: 51,
    property: COLOR.BLUE,
    pv: 2,
    price: {
      [COLOR.BLUE]: 5,
    },
    image: '2_blue_5'
  },
  52: {
    id: 52,
    property: COLOR.BLUE,
    pv: 3,
    price: {
      [COLOR.BLUE]: 6,
    },
    image: '2_blue_6'
  },
  53: {
    id: 53,
    property: COLOR.WHITE,
    pv: 1,
    price: {
      [COLOR.GREEN]: 3,
      [COLOR.RED]: 2,
      [COLOR.BLACK]: 2,
    },
    image: '2_white_3_2_2'
  },
  54: {
    id: 54,
    property: COLOR.WHITE,
    pv: 1,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.BLUE]: 3,
      [COLOR.RED]: 3,
    },
    image: '2_white_2_3_3'
  },
  55: {
    id: 55,
    property: COLOR.WHITE,
    pv: 2,
    price: {
      [COLOR.GREEN]: 1,
      [COLOR.RED]: 4,
      [COLOR.BLACK]: 2,
    },
    image: '2_white_1_4_2'
  },
  56: {
    id: 56,
    property: COLOR.WHITE,
    pv: 2,
    price: {
      [COLOR.RED]: 5,
      [COLOR.BLACK]: 3,
    },
    image: '2_white_5_3'
  },
  57: {
    id: 57,
    property: COLOR.WHITE,
    pv: 2,
    price: {
      [COLOR.RED]: 5,
    },
    image: '2_white_5'
  },
  58: {
    id: 58,
    property: COLOR.WHITE,
    pv: 3,
    price: {
      [COLOR.WHITE]: 6,
    },
    image: '2_white_6'
  },
  59: {
    id: 59,
    property: COLOR.GREEN,
    pv: 1,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.GREEN]: 2,
      [COLOR.RED]: 3,
    },
    image: '2_green_3_2_3'
  },
  60: {
    id: 60,
    property: COLOR.GREEN,
    pv: 1,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.BLUE]: 3,
      [COLOR.BLACK]: 2,
    },
    image: '2_green_2_3_2'
  },
  61: {
    id: 61,
    property: COLOR.GREEN,
    pv: 2,
    price: {
      [COLOR.WHITE]: 4,
      [COLOR.BLUE]: 2,
      [COLOR.BLACK]: 1,
    },
    image: '2_green_4_2_1'
  },
  62: {
    id: 62,
    property: COLOR.GREEN,
    pv: 2,
    price: {
      [COLOR.BLUE]: 5,
      [COLOR.GREEN]: 3,
    },
    image: '2_green_5_3'
  },
  63: {
    id: 63,
    property: COLOR.GREEN,
    pv: 2,
    price: {
      [COLOR.GREEN]: 5,
    },
    image: '2_green_5'
  },
  64: {
    id: 64,
    property: COLOR.GREEN,
    pv: 3,
    price: {
      [COLOR.GREEN]: 6,
    },
    image: '2_green_6'
  },
  65: {
    id: 65,
    property: COLOR.RED,
    pv: 1,
    price: {
      [COLOR.WHITE]: 2,
      [COLOR.RED]: 2,
      [COLOR.BLACK]: 3,
    },
    image: '2_red_2_2_3'
  },
  66: {
    id: 66,
    property: COLOR.RED,
    pv: 1,
    price: {
      [COLOR.BLUE]: 3,
      [COLOR.RED]: 2,
      [COLOR.BLACK]: 3,
    },
    image: '2_red_3_2_3'
  },
  67: {
    id: 67,
    property: COLOR.RED,
    pv: 2,
    price: {
      [COLOR.WHITE]: 1,
      [COLOR.BLUE]: 4,
      [COLOR.GREEN]: 2,
    },
    image: '2_red_1_4_2'
  },
  68: {
    id: 68,
    property: COLOR.RED,
    pv: 2,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLACK]: 5,
    },
    image: '2_red_3_5'
  },
  69: {
    id: 69,
    property: COLOR.RED,
    pv: 2,
    price: {
      [COLOR.BLACK]: 5,
    },
    image: '2_red_5'
  },
  70: {
    id: 70,
    property: COLOR.RED,
    pv: 3,
    price: {
      [COLOR.RED]: 6,
    },
    image: '2_red_6'
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
  },
  76: {
    id: 76,
    property: COLOR.BLUE,
    pv: 4,
    price: {
      [COLOR.WHITE]: 7,
    },
    image: '3_blue_7'
  },
  77: {
    id: 77,
    property: COLOR.BLUE,
    pv: 4,
    price: {
      [COLOR.WHITE]: 6,
      [COLOR.BLUE]: 3,
      [COLOR.BLACK]: 3,
    },
    image: '3_blue_6_3_3'
  },
  78: {
    id: 78,
    property: COLOR.BLUE,
    pv: 5,
    price: {
      [COLOR.WHITE]: 7,
      [COLOR.BLUE]: 3,
    },
    image: '3_blue_7_3'
  },
  79: {
    id: 79,
    property: COLOR.WHITE,
    pv: 3,
    price: {
      [COLOR.BLUE]: 3,
      [COLOR.GREEN]: 3,
      [COLOR.RED]: 5,
      [COLOR.BLACK]: 3,
    },
    image: '3_white_3_3_5_3'
  },
  80: {
    id: 80,
    property: COLOR.WHITE,
    pv: 4,
    price: {
      [COLOR.BLACK]: 7,
    },
    image: '3_white_7'
  },
  81: {
    id: 81,
    property: COLOR.WHITE,
    pv: 4,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.RED]: 3,
      [COLOR.BLACK]: 6,
    },
    image: '3_white_3_3_6'
  },
  82: {
    id: 82,
    property: COLOR.WHITE,
    pv: 5,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLACK]: 7,
    },
    image: '3_white_3_7'
  },
  83: {
    id: 83,
    property: COLOR.GREEN,
    pv: 3,
    price: {
      [COLOR.WHITE]: 5,
      [COLOR.BLUE]: 3,
      [COLOR.RED]: 3,
      [COLOR.BLACK]: 3,
    },
    image: '3_green_5_3_3_3'
  },
  84: {
    id: 84,
    property: COLOR.GREEN,
    pv: 4,
    price: {
      [COLOR.BLUE]: 7,
    },
    image: '3_green_7'
  },
  85: {
    id: 85,
    property: COLOR.GREEN,
    pv: 4,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLUE]: 6,
      [COLOR.GREEN]: 3,
    },
    image: '3_green_3_6_3'
  },
  86: {
    id: 86,
    property: COLOR.GREEN,
    pv: 5,
    price: {
      [COLOR.BLUE]: 7,
      [COLOR.GREEN]: 3,
    },
    image: '3_green_7_3'
  },
  87: {
    id: 87,
    property: COLOR.RED,
    pv: 3,
    price: {
      [COLOR.WHITE]: 3,
      [COLOR.BLUE]: 5,
      [COLOR.GREEN]: 3,
      [COLOR.BLACK]: 3,
    },
    image: '3_red_3_5_3_3'
  },
  88: {
    id: 88,
    property: COLOR.RED,
    pv: 4,
    price: {  
      [COLOR.GREEN]: 7,
    },
    image: '3_red_7'
  },
  89: {
    id: 89,
    property: COLOR.RED,
    pv: 4,
    price: {  
      [COLOR.BLUE]: 3,
      [COLOR.GREEN]: 6,
      [COLOR.RED]: 3,
    },
    image: '3_red_3_6_3'
  },
  90: {
    id: 90,
    property: COLOR.RED,
    pv: 5,
    price: {  
      [COLOR.GREEN]: 7,
      [COLOR.RED]: 3,
    },
    image: '3_red_7_3'
  },
};
const CARD_TABLE = {
  1: [
    CARDS[1], CARDS[2], CARDS[3], CARDS[4], CARDS[5], CARDS[6], CARDS[7], CARDS[8], 
    CARDS[9], CARDS[10], CARDS[11], CARDS[12], CARDS[13], CARDS[14], CARDS[15], CARDS[16],
    CARDS[17], CARDS[18], CARDS[19], CARDS[20], CARDS[21], CARDS[22], CARDS[23], CARDS[24],
    CARDS[25], CARDS[26], CARDS[27], CARDS[28], CARDS[29], CARDS[30], CARDS[31], CARDS[32],
    CARDS[33], CARDS[34], CARDS[35], CARDS[36], CARDS[37], CARDS[38], CARDS[39], CARDS[40],
  ],
  2: [
    CARDS[41], CARDS[42], CARDS[43], CARDS[44], CARDS[45], CARDS[46], 
    CARDS[47], CARDS[48], CARDS[49], CARDS[50], CARDS[51], CARDS[52], 
    CARDS[53], CARDS[54], CARDS[55], CARDS[56], CARDS[57], CARDS[58], 
    CARDS[59], CARDS[60], CARDS[61], CARDS[62], CARDS[63], CARDS[64], 
    CARDS[65], CARDS[66], CARDS[67], CARDS[68], CARDS[69], CARDS[70],
  ],
  3: [
    CARDS[71], CARDS[72], CARDS[73], CARDS[74], 
    CARDS[75], CARDS[76], CARDS[77], CARDS[78], 
    CARDS[79], CARDS[80], CARDS[81], CARDS[82], 
    CARDS[83], CARDS[84], CARDS[85], CARDS[86], 
    CARDS[87], CARDS[88], CARDS[89], CARDS[90], 
  ],
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