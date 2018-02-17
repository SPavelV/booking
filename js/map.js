"use strict";

const OBJECTS_QTY = 8;
const PIN_MAP = document.querySelector('.tokyo__pin-map');
const OFFER_DIALOG = document.querySelector('.dialog');
const OFFER_DIALOG_TITLE = OFFER_DIALOG.querySelector('.dialog__title');
const OFFER_DIALOG_AVATAR = OFFER_DIALOG_TITLE.querySelector('img');
const DIALOG_PANEL = OFFER_DIALOG.querySelector('.dialog__panel');
const TEMPLATE_DIALOG_PANEL = document.querySelector('#lodge-template');
const TEMPLATE_DIALOG_PANEL_CONTENT = TEMPLATE_DIALOG_PANEL.content;
let adsArray = [];
let fragment = document.createDocumentFragment();

class AdsObject {

  constructor() {
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

    const getRandomArray = arr => {
      let lengthNewArr = getRandomArbitary(1, arr.length);
      let newArray = [];
      for(let i = 0; i < lengthNewArr; i++) {
        newArray[i] = arr[i];
      }
      return newArray;
    };

    let authorAvatarSrc = 'img/avatars/user0';
    let offerTitle = TITLE_OBJECTS[getRandomNum(TITLE_OBJECTS.length - 1)];
    let offerLocationX = getRandomArbitary(LOCATION_MIN_X, LOCATION_MAX_X);
    let offerLocationY = getRandomArbitary(LOCATION_MIN_Y, LOCATION_MAX_Y);
    let offerLocationCoordinates = offerLocationX + "," + offerLocationY;
    let offerPrice = getRandomArbitary(MIN_PRICE, MAX_PRICE);
    let offerType = TYPE_OBJECTS[getRandomNum(TYPE_OBJECTS.length - 1)];
    let offerRooms = getRandomArbitary(1, MAX_ROOMS);
    let offerGuests = getRandomNum(MAX_GUESTS);
    let offerCheckin = CHECKIN_CHECKOUT_TIMES[getRandomNum(CHECKIN_CHECKOUT_TIMES.length - 1)];
    let offerCheckout = CHECKIN_CHECKOUT_TIMES[getRandomNum(CHECKIN_CHECKOUT_TIMES.length - 1)];
    let offerFeatures = getRandomArray(FEATURES);
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
      "features": offerFeatures,
      "description": offerDescription,
      "photos": offerPhotos
    };

    this.location = {
      "x": offerLocationX,
      "y": offerLocationY
    }
  }
}

const createAdsArray = function (lengthArray) {
  let numAvatar = 1;
  let adsObjects = [];
  for (let i = 0; i < lengthArray; i++) {
    adsObjects[i] = new AdsObject();
    adsObjects[i].author.avatar = adsObjects[i].author.avatar + numAvatar + '.png';
    numAvatar++;
  }

  return adsObjects;
};

adsArray = createAdsArray(OBJECTS_QTY);

const createTemplateLabelHtml = function (adsObject) {
  let newLabelMap = document.createElement('div');
  newLabelMap.className = 'pin';
  newLabelMap.style.left = adsObject.location.x + 'px';
  newLabelMap.style.top = adsObject.location.y + 'px';
  newLabelMap.innerHTML = '<img src="' + adsObject.author.avatar + '" class="rounded" width="40" height="40">';

  return newLabelMap;
};

const createLabelsInMap = function (adsArray, map) {
  for (let i = 0; i < adsArray.length; i++) {
    fragment.appendChild(createTemplateLabelHtml(adsArray[i]));
  }

  map.appendChild(fragment);
};

createLabelsInMap(adsArray, PIN_MAP);

const renderDialogPanel = function (templateDialogContent, offerObject) {
  let dialogPanel = templateDialogContent.cloneNode(true);
  let typeObjectRu = type => {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      default:
        return 'Неизестный тип жилья'
    }
  };

  let getFeaturesObjectHtml = object => {
    let featuresTemplate = '';
    for(let i = 0; i < object.offer.features.length; i++) {
      featuresTemplate += '<span class="feature__image feature__image--'
        + object.offer.features[i] + '"></span>';
    }
    return featuresTemplate;
  };

  dialogPanel.querySelector('.lodge__title').textContent = offerObject.offer.title;
  dialogPanel.querySelector('.lodge__address').textContent = offerObject.offer.address;
  dialogPanel.querySelector('.lodge__price').textContent = offerObject.offer.price + ' \u20bd/ночь';
  dialogPanel.querySelector('.lodge__type').textContent = typeObjectRu(offerObject.offer.type);
  dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offerObject.offer.guests
    + ' гостей в ' + offerObject.offer.rooms + ' комнатах';
  dialogPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offerObject.offer.checkin
    + ', выезд до ' + offerObject.offer.checkout;
  dialogPanel.querySelector('.lodge__features').innerHTML = getFeaturesObjectHtml(offerObject);
  dialogPanel.querySelector('.lodge__description').textContent = offerObject.offer.description;
  OFFER_DIALOG_AVATAR.setAttribute('src', offerObject.author.avatar);

  return dialogPanel;
};

const createDialogPanel = function (dialogParent, dialogPanel, newDialogPanel) {
  dialogParent.replaceChild(newDialogPanel, dialogPanel);
};

createDialogPanel(OFFER_DIALOG, DIALOG_PANEL, renderDialogPanel(TEMPLATE_DIALOG_PANEL_CONTENT, adsArray[0]));


