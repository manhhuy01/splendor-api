/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const gameHandler = require('./gameHandler');

test('getDukeFromCards', () => {
  let cards = [{ id: 39, property: 'red', pv: 0, image: '1_red_3' },
    { id: 5, property: 'black', pv: 0, image: '1_black_2_1' },
    { id: 26, property: 'green', pv: 0, image: '1_green_1_1_1_2' },
    { id: 40, property: 'red', pv: 1, image: '1_red_4' },
    { id: 4, property: 'black', pv: 0, image: '1_black_1_3_1' },
    { id: 12, property: 'blue', pv: 0, image: '1_blue_1_3_1' },
    { id: 65, property: 'red', pv: 1, image: '2_red_2_2_3' },
    { id: 66, property: 'red', pv: 1, image: '2_red_3_2_3' },
    { id: 74, property: 'black', pv: 5, image: '3_black_7_3' },
    { id: 41, property: 'black', pv: 1, image: '2_black_3_2_2' }];
  let dukes = [
    {
      id: 2, pv: 3, price: {
        blue: 4,
        white: 4
      }, image: 'ct_5'
    },
    {
      id: 7, pv: 3, price: {
        black: 3,
        blue: 3,
        white: 3,
      }, image: 'ct_9'
    },
    {
      id: 9, pv: 3, price: {
        blue: 3,
        green: 3,
        white: 3
      }, image: 'ct_1'
    },
    {
      id: 3, pv: 3, price: {
        black: 4,
        red: 4
      }, image: 'ct_4'
    },
    {
      id: 5, pv: 3, price: {
        blue: 4,
        green: 4
      }, image: 'ct_6'
    },
  ];
  const duke = gameHandler.getDukeFromCards(dukes, cards);
  expect(duke).not.toBe(undefined);
});

test('given token from buying', () => {
  const priceToken = {
    red: 4
  }
  const player = {
    token : {
      red: 2,
      gold: 2
    },
    cards: []
  }
  const givenTokenFromBuying = gameHandler.givenTokenFromBuying(priceToken, player)
  expect(givenTokenFromBuying).toEqual({
    gold: 2,
    red: 2
  })
})