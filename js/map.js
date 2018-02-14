"use strict";

class Ads {

  constructor() {
    const MAX_OBJECT = 8;
    const MIN_PRICE = 1000;
    const MAX_PRICE = 1000000;
    const MAX_ROOMS = 5;
    const MAX_GUESTS = 10;
    const getRandomNum = num => {
      return Math.ceil((Math.random() * num) );
    };
    const TITLE_OBJECT = ["Большая уютная квартира", "Маленькая неуютная квартира",
                   "Огромный прекрасный дворец", "Маленький ужасный дворец",
                   "Красивый гостевой домик", "Некрасивый негостеприимный домик",
                   "Уютное бунгало далеко от моря", "Неуютное бунгало " +
                   "по колено в воде"];
    const TYPE_OBJECT = ['flat', 'house', 'bungalo'];
    let ROOMS = getRandomNum(MAX_ROOMS);
    let guests = getRandomNum(MAX_GUESTS);
    let address =  "{{location.x}}, {{location.y}}";
    let avatarSrc = getRandomNum(MAX_OBJECT);
    let adsObjectArray = [];
  }
}
