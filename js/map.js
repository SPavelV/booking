"use strict";

const OBJECTS_QTY = 8;

class AdsObject {

  constructor(objectsQty) {
    const MAX_QTY_OBJECT = objectsQty;
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

    const getRandomArbitary = function (min, max) {
      ++max;
      return Math.floor(Math.random() * (max - min) + min);
    };
    const AUTHOR_AVATAR_SRC = 'img/avatars/user0' + getRandomNum(MAX_QTY_OBJECT);
    const OFFER_TITLE = TITLE_OBJECTS[getRandomNum(TITLE_OBJECTS.length - 1)];
    const OFFER_LOCATION_X = getRandomArbitary(LOCATION_MIN_X, LOCATION_MAX_X);
    const OFFER_LOCATION_Y = getRandomArbitary(LOCATION_MIN_Y, LOCATION_MAX_Y);
    const OFFER_LOCATION_COORDINATES = "{{location." + OFFER_LOCATION_X + "}}, {{location." +
      OFFER_LOCATION_Y + "}}";
    const OFFER_PRICE = getRandomArbitary(MIN_PRICE, MAX_PRICE);
    const OFFER_TYPE = TYPE_OBJECTS[getRandomNum(TYPE_OBJECTS.length - 1)];
    const OFFER_ROOMS = getRandomNum(MAX_ROOMS);
    const OFFER_GUESTS = getRandomNum(MAX_GUESTS);
    const OFFER_CHECKIN = CHECKIN_CHECKOUT_TIMES[getRandomNum(CHECKIN_CHECKOUT_TIMES.length - 1)];
    const OFFER_CHECKOUT = CHECKIN_CHECKOUT_TIMES[getRandomNum(CHECKIN_CHECKOUT_TIMES.length - 1)];
    const OFFER_FEATURERS = FEATURES[getRandomNum(FEATURES.length - 1)];
    const OFFER_DESCRIPTION = '';
    const OFFER_PHOTOS = [];

    this.author = {"avatar": AUTHOR_AVATAR_SRC};
    this.offer = {
      "title": OFFER_TITLE,
      "address": OFFER_LOCATION_COORDINATES,
      "price": OFFER_PRICE,
      "type": OFFER_TYPE,
      "rooms": OFFER_ROOMS,
      "guests": OFFER_GUESTS,
      "checkin": OFFER_CHECKIN,
      "checkout": OFFER_CHECKOUT,
      "featurers": OFFER_FEATURERS,
      "description": OFFER_DESCRIPTION,
      "photos": OFFER_PHOTOS
    };

    this.location = {
      "x": OFFER_LOCATION_X,
      "y": OFFER_LOCATION_Y
    }
  }
}

let obj1 = new AdsObject(8);
console.dir(obj1);

let createAdsArray = function (lengthArray) {
  let adsObjects = [];
  for (let i = 0; i < lengthArray.length; i++) {
    adsObjects[i] = new AdsObject(OBJECTS_QTY);
  }
  return adsObjects;
};

// const ADS_ARRAY = createAdsArray(OBJECTS_QTY);
// console.dir(ADS_ARRAY);


let createTemplateLabelHtml = function (adsObject) {
  return '<div class="pin" style="left: {{' + adsObject.location.x + '}}px; top: {{' + adsObject.location.y + '}}px">' +
    '<img src="{{' + adsObject.author.avatar + '}}" class="rounded" width="40" height="40">' +
    '</div>'
};

let createLabelsHtml = function (adsArray) {
  let htmlLabels;
  for (let i = 0; i < adsArray.length; i++) {
    htmlLabels += createTemplateLabelHtml(adsArray[i]);
  }
  return htmlLabels;
};

// console.log(createLabelsHtml(ADS_ARRAY));


