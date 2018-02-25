"use strict";

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

    const getRandomInteger = (min, max) => {
      return Math.floor(min + Math.random() * (max - min + 1));
    };

    const getRandomArray = arr => {
      return arr.filter(() => {
        return Math.random() * 1000 >= 500;
      })
    };

    this.getRandomAdsObject = () => {
      let adsObj = {};
      let authorAvatarSrc = 'img/avatars/user0';
      let offerTitle = TITLE_OBJECTS[getRandomInteger(0, TITLE_OBJECTS.length - 1)];
      let offerLocationX = getRandomInteger(LOCATION_MIN_X, LOCATION_MAX_X);
      let offerLocationY = getRandomInteger(LOCATION_MIN_Y, LOCATION_MAX_Y);
      let offerLocationCoordinates = offerLocationX + "," + offerLocationY;
      let offerPrice = getRandomInteger(MIN_PRICE, MAX_PRICE);
      let offerType = TYPE_OBJECTS[getRandomInteger(0, TYPE_OBJECTS.length - 1)];
      let offerRooms = getRandomInteger(1, MAX_ROOMS);
      let offerGuests = getRandomInteger(0, MAX_GUESTS);
      let offerCheckin = CHECKIN_CHECKOUT_TIMES[getRandomInteger(0, CHECKIN_CHECKOUT_TIMES.length - 1)];
      let offerCheckout = CHECKIN_CHECKOUT_TIMES[getRandomInteger(0, CHECKIN_CHECKOUT_TIMES.length - 1)];
      let offerFeatures = getRandomArray(FEATURES);
      let offerDescription = '';
      let offerPhotos = [];

      adsObj.author = {"avatar": authorAvatarSrc};
      adsObj.offer = {
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

      adsObj.location = {
        "x": offerLocationX,
        "y": offerLocationY
      };
      return adsObj;
    }
  }
}

class Map {

  constructor() {
    const OBJECTS_QTY = 8;

    document.addEventListener('DOMContentLoaded', () => {
      const pinMap = document.querySelector('.tokyo__pin-map');
      const offerDialog = document.querySelector('.dialog');
      const offerDialogTitle = offerDialog.querySelector('.dialog__title');
      const offerDialogAvatar = offerDialogTitle.querySelector('img');
      const dialogPanel = offerDialog.querySelector('.dialog__panel');
      const templateDialogPanel = document.querySelector('#lodge-template');
      let fragment = document.createDocumentFragment();

      const mockData = arrLength => {
        let adsObjects = [];

        for (let i = 0; i < arrLength; i++) {
          adsObjects[i] = new AdsObject().getRandomAdsObject();
          adsObjects[i].author.avatar = adsObjects[i].author.avatar + (i + 1) + '.png';
        }

        return adsObjects;
      };

      const createTemplateLabelHtml = adsObject => {
        let newLabelMap = document.createElement('div');
        newLabelMap.className = 'pin';
        newLabelMap.style.left = adsObject.location.x + 'px';
        newLabelMap.style.top = adsObject.location.y + 'px';
        newLabelMap.innerHTML = `<img src=${adsObject.author.avatar} class="rounded" width="40" height="40">`;

        return newLabelMap;
      };

      const createLabelsInMap = (adsArray, map) => {
        for (let i = 0; i < adsArray.length; i++) {
          fragment.appendChild(createTemplateLabelHtml(adsArray[i]));
        }

        map.appendChild(fragment);
      };

      const convertTypeObject = type => {
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

      const getFeaturesObjectHtml = object => {
        let featuresTemplate = '';
        for (let i = 0; i < object.offer.features.length; i++) {
          featuresTemplate += `<span class="feature__image feature__image--${object.offer.features[i]}"></span>`;
        }
        return featuresTemplate;
      };

      const renderDialogPanel = (templateDialogContent, offerObject) => {
        dialogPanel.querySelector('.lodge__title').textContent = offerObject.offer.title;
        dialogPanel.querySelector('.lodge__address').textContent = offerObject.offer.address;
        dialogPanel.querySelector('.lodge__price').textContent = offerObject.offer.price + ' \u20bd/ночь';
        dialogPanel.querySelector('.lodge__type').textContent = convertTypeObject(offerObject.offer.type);
        dialogPanel.querySelector('.lodge__rooms-and-guests').textContent = `Для ${offerObject.offer.guests} гостей в ${offerObject.offer.rooms} комнатах`;
        dialogPanel.querySelector('.lodge__checkin-time').textContent = `Заезд после ${offerObject.offer.checkin}, выезд до ${offerObject.offer.checkout}`;
        dialogPanel.querySelector('.lodge__features').innerHTML = getFeaturesObjectHtml(offerObject);
        dialogPanel.querySelector('.lodge__description').textContent = offerObject.offer.description;
        offerDialogAvatar.setAttribute('src', offerObject.author.avatar);

        return dialogPanel;
      };

      const createDialogPanel = (dialogParent, dialogPanel, newDialogPanel) => {
        dialogParent.replaceChild(newDialogPanel, dialogPanel);
      };

      const createHandlersEvents = (adsData) => {
        const pin = document.querySelectorAll('.pin:not(.pin__main)');
        const btnCloseDialog = document.querySelector('.dialog__close');
        const dialog = document.querySelector('#offer-dialog');

        let onBtnCloseDialogClick = (e)=> {
          for (let i = 0; i < pin.length; i++) {
            pin[i].classList.remove('pin--active');
          }

          dialog.classList.add('hidden');
        };

        let openDialogPanel = () => {
          dialog.classList.remove('hidden');
        };

        const onPinMapClick = (pin, evt, index) => {
          let siblingsPin = Array.prototype.filter.call(pin[index].parentNode.children, (child) => {
            return child !== pin[index];
          });

          for (let i = 0; i < siblingsPin.length; i++) {
            siblingsPin[i].classList.remove('pin--active');
          }

          evt.currentTarget.classList.add('pin--active');
          createDialogPanel(dialog, dialogPanel, renderDialogPanel(templateDialogPanel.content, adsData[index]));

          openDialogPanel();

          btnCloseDialog.addEventListener('click', onBtnCloseDialogClick);

        };

        for (let i = 0; i < pin.length; i++) {
          pin[i].addEventListener('click', (e) => {
            onPinMapClick(pin, e, i);
          })
        }
      };

      const mapInit = () => {
        const adsData = mockData(OBJECTS_QTY);

        createLabelsInMap(adsData, pinMap);
        createDialogPanel(offerDialog, dialogPanel, renderDialogPanel(templateDialogPanel.content, adsData[0]));
        createHandlersEvents(adsData);
      };

      mapInit();

    })
  }
}

new Map();
