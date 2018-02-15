"use strict";

class Ads {

  constructor() {
    const MAX_QTY_OBJECT = 8;
    const MIN_PRICE = 1000;
    const MAX_PRICE = 1000000;
    const MAX_ROOMS = 5;
    const MAX_GUESTS = 10;
    const LOCATION_MIN_X = 300;
    const LOCATION_MAX_X = 900;
    const LOCATION_MIN_Y = 100;
    const LOCATION_MAX_Y = 500;
    const CHECKIN_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
    const TITLE_OBJECTS = ["Большая уютная квартира", "Маленькая неуютная квартира",
                   "Огромный прекрасный дворец", "Маленький ужасный дворец",
                   "Красивый гостевой домик", "Некрасивый негостеприимный домик",
                   "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
    const TYPE_OBJECTS = ['flat', 'house', 'bungalo'];
    const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    const getRandom = () => {
      return Math.random();
    };
    const getRandomNum = num => {
      return Math.floor(getRandom() * num);
    };

    const getRandomArbitary = function(min, max) {
      ++max;
      return Math.random() * (max - min) + min;
    };
    const AUTHOR_AVATAR_SRC = 'img/avatars/user0' + getRandomNum(MAX_QTY_OBJECT) + '\'';
    const OFFER_TITLE = TITLE_OBJECTS[getRandomNum(TITLE_OBJECTS.length - 1)];
    const OFFER_LOCATION_X = getRandomArbitary(LOCATION_MIN_X, LOCATION_MAX_X);
    const OFFER_LOCATION_Y =  getRandomArbitary(LOCATION_MIN_Y, LOCATION_MAX_Y);
    const OFFER_LOCATION_COORDINATES = "{{location." + LOCATION_OBJECT_X + "}}, {{location." +
                                          LOCATION_OBJECT_Y + "}}";
    const OFFER_PRICE_ = getRandomArbitary(MIN_PRICE, MAX_PRICE);
    const OFFER_ROOMS = getRandomNum(MAX_ROOMS);
    const OFFER_GUESTS = getRandomNum(MAX_GUESTS);
    const OFFER_CHECKIN = CHECKIN_CHECKOUT_TIMES[getRandomNum(CHECKIN_CHECKOUT_TIMES.length - 1)];
    const OFFER_DESCRIPTION = '';
    const OFFER_PHOTOS = [];
    const ADS_OBJECTS = [];
    const LOCATION = {};
  }
}
