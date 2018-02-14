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
    const getRandomNum = num => {
      return Math.ceil((Math.random() * num));
    };
    const getLocationCoordinates = function (minVal, maxVal) {

    };
    const ADS_OBJECTS = [];
    const DESCRIPTION = '';
    const PHOTOS = [];
    const LOCATION = {};
    const AVATAR_SRC = 'img/avatars/user0' + getRandomNum(MAX_QTY_OBJECT) + '\'';
    const ADDRESS =  "{{location.x}}, {{location.y}}";
    const ROOMS = getRandomNum(MAX_ROOMS);
    const GUESTS = getRandomNum(MAX_GUESTS);
  }
}
