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
    let authorAvatarSrc = 'img/avatars/user0' + getRandomNum(MAX_QTY_OBJECT);
    let offerTitle = TITLE_OBJECTS[getRandomNum(TITLE_OBJECTS.length - 1)];
    let offerLocationX = getRandomArbitary(LOCATION_MIN_X, LOCATION_MAX_X);
    let offerLocationY = getRandomArbitary(LOCATION_MIN_Y, LOCATION_MAX_Y);
    let offerLocationCoordinates = "{{location." + offerLocationX + "}}, {{location." +
      offerLocationY + "}}";
    let offerPrice = getRandomArbitary(MIN_PRICE, MAX_PRICE);
    let offerType = TYPE_OBJECTS[getRandomNum(TYPE_OBJECTS.length - 1)];
    let offerRooms = getRandomNum(MAX_ROOMS);
    let offerGuests = getRandomNum(MAX_GUESTS);
    let offerCheckin = CHECKIN_CHECKOUT_TIMES[getRandomNum(CHECKIN_CHECKOUT_TIMES.length - 1)];
    let offerCheckout = CHECKIN_CHECKOUT_TIMES[getRandomNum(CHECKIN_CHECKOUT_TIMES.length - 1)];
    let offerFeatures = FEATURES[getRandomNum(FEATURES.length - 1)];
    let offerDescription = '';
    let offerPhotos = [];

    this.author = {"avatar": authorAvatarSrc};
    this.offer = {
      "title": offerTitle,
      "address": offerLocationCoordinates,
      "price": offerPrice,
      "type": offerType,
      "rooms": offerRooms,
      "guests": offerGuests,
      "checkin": offerCheckin,
      "checkout": offerCheckout,
      "featurers": offerFeatures,
      "description": offerDescription,
      "photos": offerPhotos
    };

    this.location = {
      "x": offerLocationX,
      "y": offerLocationY
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


