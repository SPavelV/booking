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

    const getSiblings = elem => {
      let siblings = [];
      let sibling = elem.parentNode.firstChild;
      for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType !== 1 || sibling === elem) continue;
        siblings.push(sibling);
      }
      return siblings;
    };
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
      newLabelMap.setAttribute('tabindex', 0);
      newLabelMap.style.left = adsObject.location.x + 'px';
      newLabelMap.style.top = adsObject.location.y + 'px';
      newLabelMap.innerHTML = `<img src=${adsObject.author.avatar} class="rounded" width="40" height="40">`;

      return newLabelMap;
    };

    document.addEventListener('DOMContentLoaded', () => {
      const pinMap = document.querySelector('.tokyo__pin-map');
      const offerDialog = document.querySelector('.dialog');
      const offerDialogTitle = offerDialog.querySelector('.dialog__title');
      const offerDialogAvatar = offerDialogTitle.querySelector('img');
      const dialogPanel = offerDialog.querySelector('.dialog__panel');
      const templateDialogPanel = document.querySelector('#lodge-template');
      let fragment = document.createDocumentFragment();

      const createLabelsInMap = (adsArray, map) => {
        if(!map) return;
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
        if(!dialogParent && !dialogPanel && !newDialogPanel) return;
        dialogParent.replaceChild(newDialogPanel, dialogPanel);
      };

      const createHandlersEvents = (adsData) => {
        const ESC_KEYCODE = 27;
        const ENTER_KEYCODE = 13;
        let pinAll = document.querySelectorAll('.pin:not(.pin__main)');
        const pin = document.querySelector('.pin');
        const btnCloseDialog = document.querySelector('.dialog__close');
        const dialog = document.querySelector('#offer-dialog');

        pinAll = Array.prototype.slice.call(pinAll);

        const onEscPress = (evt) => {
          if (evt.keyCode === ESC_KEYCODE) {
            closeDialog(evt);
          }
        };

        const onBtnCloseDialogPress = (evt) => {
          if (evt.keyCode === ENTER_KEYCODE) {
            closeDialog(evt);
          }
        };

        const closeDialog = () => {
          if(!dialog && !pinAll && !btnCloseDialog) return;

          pinAll.forEach(item => item.classList.remove('pin--active'));

          dialog.classList.add('hidden');

          btnCloseDialog.removeEventListener('keydown', onBtnCloseDialogPress);
          btnCloseDialog.removeEventListener('click', closeDialog);
        };

        const openDialogPanel = () => {
          if(!dialog && !btnCloseDialog) return;
          dialog.classList.remove('hidden');

          document.addEventListener('keydown', onEscPress);
          btnCloseDialog.addEventListener('keydown', onBtnCloseDialogPress);
          btnCloseDialog.addEventListener('click', closeDialog);
        };

        const activePin = (pinAll, pin, evt, index) => {
          if(!pinAll && !pin) return;
          let siblingsPin = getSiblings(evt.currentTarget);

          siblingsPin.forEach(item => item.classList.remove('pin--active'));

          evt.currentTarget.classList.add('pin--active');
          createDialogPanel(dialog, dialogPanel, renderDialogPanel(templateDialogPanel.content, adsData[index]));

          openDialogPanel();
        };

        pinAll.map((item, i) => {
          item.addEventListener('click', (evt) => {
            activePin(pinAll, pin, evt, i);
          });

          item.addEventListener('keydown', (evt) => {
            if (evt.keyCode === ENTER_KEYCODE) {
              activePin(pinAll, pin, evt, i);
            }
          });

          item.addEventListener('mousedown', (evt) => {
            evt.preventDefault();

            let startCoords = {
              x: evt.clientX,
              y: evt.clientY
            };

                const onMouseMove = (moveEvt) => {
              moveEvt.preventDefault();

              let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
              };

              startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
              };

              moveEvt.target.style.top = (moveEvt.target.offsetTop - shift.y) + 'px';
              moveEvt.target.style.left = (moveEvt.target.offsetLeft - shift.x) + 'px';
            };

            const onMouseUp = (upEvt) => {
              upEvt.preventDefault();

              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          })
        });

        openDialogPanel();
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

class ValidationForm {

  constructor() {

    document.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('.notice__form');
      const timeIn = form.elements.timein;
      const timeOut = form.elements.timeout;
      const typeLodging = form.elements.type;
      const priceNight = form.elements.price;
      const qtyRooms = form.elements.rooms;
      const qtySeats = form.elements.capacity;
      const submitBtn = form.querySelector('.form__submit');

      const onChangeTypeLodgingPrice = evt => {
        if(!typeLodging && !priceNight) return;
        const theTarget = evt.target;

        if(theTarget === typeLodging) {

          [...theTarget.options].forEach((option, i) => {
            if(option.selected) {
              switch(option.text) {
                case 'Лачуга':
                  priceNight.value = 0;
                  break;
                case 'Квартира':
                  priceNight.value = 1000;
                  break;
                case 'Дом':
                  priceNight.value = 5000;
                  break;
                case 'Дворец':
                  priceNight.value = 10000;
                  break;
                default:
                  priceNight.value = 0.1;
              }
            }
          });
        }

        if(theTarget === priceNight) {
          priceNight.value = parseInt(theTarget.value);

          if(priceNight.value >= 0 && priceNight.value < 1000) {
            typeLodging.value = 'bungalo';
          } else if (priceNight.value >= 1000 && priceNight.value < 5000) {
            typeLodging.value = 'flat';
          } else if (priceNight.value >= 5000 && priceNight.value < 10000) {
            typeLodging.value = 'house';
          } else if (priceNight.value >= 10000) {
            typeLodging.value = 'palace';
          }
        }
      };
      const onSelectRoomsQtySeats = evt => {
        if(!qtyRooms && !qtySeats) return;
        let select = evt.target;
        let selectedOptionValue;

        [...select.options].forEach( option => {
          if(option.selected) {
            selectedOptionValue = option.value;
          }
        });

        if(select.name === 'rooms') {
          if(selectedOptionValue === '100') {
            qtySeats.value = '0';
          } else {
            qtySeats.value = selectedOptionValue;
          }
        } else if (select.name === 'capacity') {
          if(selectedOptionValue === '0') {
            qtyRooms.value = '100';
          } else {
            qtyRooms.value = selectedOptionValue;
          }
        } else {
          console.log('Wtf?')
        }
      };
      const onBtnSubmitClick = evt => {
        [...form.elements].forEach( (input, i) => {
          if(input.checkValidity() === false) {
            input.classList.add('invalid-input');
          } else {
            input.classList.remove('invalid-input');
          }
        });
      };

      if(timeIn) {
        timeIn.addEventListener('change', () => {
          timeOut.selectedIndex = timeIn.selectedIndex;
        });
      }

      if(timeOut) {
        timeOut.addEventListener('change', () => {
          timeIn.selectedIndex = timeOut.selectedIndex;
        });
      }

      typeLodging.addEventListener('change', onChangeTypeLodgingPrice);
      priceNight.addEventListener('input', onChangeTypeLodgingPrice);

      qtyRooms.addEventListener('change', onSelectRoomsQtySeats);
      qtySeats.addEventListener('change', onSelectRoomsQtySeats);

      submitBtn.addEventListener('click', onBtnSubmitClick);
    });

  }
}

new Map();
new ValidationForm();
