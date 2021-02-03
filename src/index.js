import './styles/styles.css';
import fetch from 'node-fetch';
import mapboxgl from 'mapbox-gl';
import * as constant from './constants';
import getStartOffset from './offset';

const element = {
  locationName: document.querySelector('.todays-weather__geolocation'),
  latitude: document.querySelector('.latitude'),
  longitude: document.querySelector('.longitude'),
  date: document.querySelector('.todays-weather__day'),
  time: document.querySelector('.todays-weather__time'),
  todaysWeatherValue: document.querySelector('.todays-weather__value'),
  todaysWeatherSummary: document.querySelector('.todays-weather__summary'),
  todaysWeatherPic: document.querySelector('.todays-weather__pic'),
  threeDaysWeather: document.querySelector('.three-days-weather'),
  geolocationMap: document.querySelector('.geolocation__map'),
  searchInput: document.querySelector('.control-block__search_input-field'),
  searchButton: document.querySelector('.control-block__search_button'),
  backgroundButton: document.querySelector('.settings__button_background'),
  enButton: document.querySelector('.settings__button_language-en'),
  ruButton: document.querySelector('.settings__button_language-ru'),
  celsiusButton: document.querySelector('.settings__button_units-c'),
  fahrenheitButton: document.querySelector('.settings__button_units-f'),
};

const state = {
  searchOffset: '',
  city: '',
};

const func = {
  currentDayWeatherFill(dataFromWeatherAPI, dataFromWeatherLocale) {
    if (!(localStorage.getItem('units')) || localStorage.getItem('units') === 'C') {
      element.todaysWeatherValue.textContent = dataFromWeatherAPI.current.temp_c + constant.SYMBOL_C;
    }
    if (localStorage.getItem('units') === 'F') {
      element.todaysWeatherValue.textContent = dataFromWeatherAPI.current.temp_f + constant.SYMBOL_F;
    }
    element.todaysWeatherPic.style.backgroundImage = `url('https:${dataFromWeatherAPI.current.condition.icon}')`;
    const numberOfRULocale = 23;
    function findLocaleWeatherText() {
      let result;
      dataFromWeatherLocale.forEach((item) => {
        if (item.code === dataFromWeatherAPI.current.condition.code) {
          result = item.languages[numberOfRULocale].night_text;
        }
      });
      return result;
    }
    const langCash = {};
    if (!(localStorage.getItem('lang')) || localStorage.getItem('lang') === 'EN') {
      langCash.weatherText = dataFromWeatherAPI.current.condition.text;
      langCash.feelsLike = 'Feels like: ';
      langCash.humidity = 'Humidity: ';
      langCash.windDirection = 'Wind direction: ';
    }
    if (localStorage.getItem('lang') === 'RU') {
      langCash.weatherText = findLocaleWeatherText();
      langCash.feelsLike = 'Ощущается как: ';
      langCash.humidity = 'Влажность: ';
      langCash.windDirection = 'Направление ветра: ';
    }
    const summaryArray = [];
    summaryArray.push(langCash.weatherText);
    if (!(localStorage.getItem('units')) || localStorage.getItem('units') === 'C') {
      summaryArray.push(`${langCash.feelsLike}${dataFromWeatherAPI.current.feelslike_c}${constant.SYMBOL_C}`);
    }
    if (localStorage.getItem('units') === 'F') {
      summaryArray.push(`${langCash.feelsLike}${dataFromWeatherAPI.current.feelslike_f}${constant.SYMBOL_F}`);
    }
    summaryArray.push(`${langCash.humidity}${dataFromWeatherAPI.current.humidity}%`);
    summaryArray.push(`${langCash.windDirection}${dataFromWeatherAPI.current.wind_dir}`);
    while (element.todaysWeatherSummary.firstElementChild) {
      element.todaysWeatherSummary.removeChild(element.todaysWeatherSummary.firstElementChild);
    }
    summaryArray.forEach((item) => {
      const div = document.createElement('div');
      div.textContent = item;
      element.todaysWeatherSummary.appendChild(div);
    });
  },
  threeDaysWeatherFill(dataFromWeatherAPI) {
    let week = [];
    if (!(localStorage.getItem('lang')) || localStorage.getItem('lang') === 'EN') {
      week = constant.WEEK_EN;
    }
    if (localStorage.getItem('lang') === 'RU') {
      week = constant.WEEK_RU;
    }
    const currentDay = new Date();
    const threeDaysWeatherArray = [];
    for (let i = 0; i < 3; i++) {
      threeDaysWeatherArray.push([]);
      threeDaysWeatherArray[i].push(week[currentDay.getDay() + 1 + i]);
      if (!(localStorage.getItem('units')) || localStorage.getItem('units') === 'C') {
        threeDaysWeatherArray[i].push(`${dataFromWeatherAPI.forecast.forecastday[i].day.avgtemp_c}${constant.SYMBOL_C}`);
      }
      if (localStorage.getItem('units') === 'F') {
        threeDaysWeatherArray[i].push(`${dataFromWeatherAPI.forecast.forecastday[i].day.avgtemp_f}${constant.SYMBOL_F}`);
      }
      threeDaysWeatherArray[i].push(dataFromWeatherAPI.forecast.forecastday[i].day.condition.icon);
    }
    while (element.threeDaysWeather.firstElementChild) {
      element.threeDaysWeather.removeChild(element.threeDaysWeather.firstElementChild);
    }
    threeDaysWeatherArray.forEach((item) => {
      const div = document.createElement('div');
      div.classList.add('three-days-weather__day');
      item.forEach((innerItem) => {
        const innerDiv = document.createElement('div');
        if (!innerItem.includes('.png')) {
          innerDiv.textContent = innerItem;
        } else {
          innerDiv.style.backgroundImage = `url('https:${innerItem}')`;
        }
        div.appendChild(innerDiv);
      });
      element.threeDaysWeather.appendChild(div);
    });
  },
  mapFill(dataFromOpencagedata) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Vzb2RkIiwiYSI6ImNra2xsb29sNDBhYmUydm5zaGI2bDNoaTEifQ.1vtz_EZz2lkvtSm-itBZFQ';
    const map = new mapboxgl.Map({
      container: element.geolocationMap,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        dataFromOpencagedata.results[0].geometry.lng,
        dataFromOpencagedata.results[0].geometry.lat,
      ],
      zoom: 9,
    });
  },
  locationFill(dataFromOpencagedata) {
    element.locationName.textContent = dataFromOpencagedata.results[0].formatted;
    const langCash = {};
    if (!(localStorage.getItem('lang')) || localStorage.getItem('lang') === 'EN') {
      langCash.latitude = 'Latitude: ';
      langCash.longitude = 'Longitude: ';
      element.searchButton.textContent = 'SEARCH';
      element.searchInput.attributes.placeholder.textContent = 'Enter city name';
    }
    if (localStorage.getItem('lang') === 'RU') {
      langCash.latitude = 'Широта: ';
      langCash.longitude = 'Долгота: ';
      element.searchButton.textContent = 'ПОИСК';
      element.searchInput.attributes.placeholder.textContent = 'Введите имя города';
    }
    element.latitude.textContent = `${langCash.latitude}${dataFromOpencagedata.results[0].geometry.lat}`;
    element.longitude.textContent = `${langCash.longitude}${dataFromOpencagedata.results[0].geometry.lng}`;
  },
  timeFill(dataFromOpencagedata) {
    state.searchOffset = dataFromOpencagedata.results[0].annotations.timezone.offset_sec;
    setInterval(() => {
      const offsetDiff = (state.searchOffset - getStartOffset()) * constant.MILLISEC_IN_SEC;
      const dateAndTime = new Date(+(new Date()) + offsetDiff);
      element.date.textContent = dateAndTime.toLocaleDateString();
      element.time.textContent = dateAndTime.toLocaleTimeString();
    }, constant.MILLISEC_IN_SEC);
  },
};

const apiUrl = {
  unsplash: 'https://api.unsplash.com/photos/random/?client_id=PvaQ97N4zKTuWsCueVfxswth-KG0q6AR3EKzVQVEy4s&query=city&per_page=1&orientation=landscape',
  ipinfo: 'https://ipinfo.io/json?token=97d1bb595fd2cd',
  opencagedata: 'https://api.opencagedata.com/geocode/v1/json?key=2119c445db424d54b308c741cfbb3a1c',
  weatherapi: 'https://api.weatherapi.com/v1/forecast.json?key=8575eaa78aaf423aac8102824213101&days=4',
  weatherLocale: 'https://www.weatherapi.com/docs/conditions.json',
};

const dataFromAPI = {};

element.celsiusButton.textContent = constant.SYMBOL_C;
element.fahrenheitButton.textContent = constant.SYMBOL_F;
element.backgroundButton.textContent = constant.SYMBOL_REFRESH;
if (!(localStorage.getItem('units')) || localStorage.getItem('units') === 'C') {
  element.celsiusButton.classList.add('settings__button_selected');
}
if (localStorage.getItem('units') === 'F') {
  element.fahrenheitButton.classList.add('settings__button_selected');
}
if (!(localStorage.getItem('lang')) || localStorage.getItem('lang') === 'EN') {
  element.enButton.classList.add('settings__button_selected');
}
if (localStorage.getItem('lang') === 'RU') {
  element.ruButton.classList.add('settings__button_selected');
}

async function getDataFromAPI(resource) {
  const response = await fetch(apiUrl[resource]);
  const data = await response.json();
  return data;
}

async function setBackgroundOfBody() {
  const data = await getDataFromAPI('unsplash');
  document.body.style.backgroundImage = `url('${data.urls.regular}')`;
}
setBackgroundOfBody();

async function setLocalTimeLocationWeatherMap() {
  const dataFromIpinfo = await getDataFromAPI('ipinfo');
  const responseFromOpencagedata = await fetch(`${apiUrl.opencagedata}&q=${dataFromIpinfo.city}&countrycode=${dataFromIpinfo.country}`);
  const dataFromOpencagedata = await responseFromOpencagedata.json();
  dataFromAPI.dataFromOpencagedata = dataFromOpencagedata;

  const responseFromWeatherAPI = await fetch(`${apiUrl.weatherapi}&q=${dataFromIpinfo.city}`);
  const dataFromWeatherAPI = await responseFromWeatherAPI.json();
  dataFromAPI.dataFromWeatherAPI = dataFromWeatherAPI;

  const dataFromWeatherLocale = await getDataFromAPI('weatherLocale');
  dataFromAPI.dataFromWeatherLocale = dataFromWeatherLocale;

  func.mapFill(dataFromOpencagedata);
  func.locationFill(dataFromOpencagedata);
  func.timeFill(dataFromOpencagedata);
  func.currentDayWeatherFill(dataFromWeatherAPI, dataFromWeatherLocale);
  func.threeDaysWeatherFill(dataFromWeatherAPI);
}
setLocalTimeLocationWeatherMap();

async function setSearchTimeLocationWeatherMap() {
  try {
    const responseFromOpencagedata = await fetch(`${apiUrl.opencagedata}&q=${state.city}`);
    const dataFromOpencagedata = await responseFromOpencagedata.json();
    dataFromAPI.dataFromOpencagedata = dataFromOpencagedata;

    const responseFromWeatherAPI = await fetch(`${apiUrl.weatherapi}&q=${state.city}`);
    const dataFromWeatherAPI = await responseFromWeatherAPI.json();
    dataFromAPI.dataFromWeatherAPI = dataFromWeatherAPI;

    const dataFromWeatherLocale = await getDataFromAPI('weatherLocale');
    dataFromAPI.dataFromWeatherLocale = dataFromWeatherLocale;

    func.mapFill(dataFromOpencagedata);
    func.locationFill(dataFromOpencagedata);
    func.timeFill(dataFromOpencagedata);
    func.currentDayWeatherFill(dataFromWeatherAPI, dataFromWeatherLocale);
    func.threeDaysWeatherFill(dataFromWeatherAPI);
  } catch (error) {
    let errorText;
    if (localStorage.getItem('lang') === 'EN') {
      errorText = 'Invalid city name.';
    } else {
      errorText = 'Неверное имя города.';
    }
    document.body.insertAdjacentHTML('afterbegin', `<div class="alert-outer"><div class="alert"><span class="alert-text">${errorText}</span></div></div>`);
    setTimeout(() => {
      document.querySelector('.alert-outer').remove();
    }, constant.MILLISEC_IN_SEC * 3);
  }
}

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('control-block__search_button')) {
    state.city = element.searchInput.value;
    setSearchTimeLocationWeatherMap();
  }
  if (e.target.classList.contains('settings__button_background')) {
    setBackgroundOfBody();
  }
  if (e.target.classList.contains('settings__button_units-c')) {
    e.target.classList.add('settings__button_selected');
    element.fahrenheitButton.classList.remove('settings__button_selected');
    localStorage.setItem('units', 'C');
    func.currentDayWeatherFill(dataFromAPI.dataFromWeatherAPI, dataFromAPI.dataFromWeatherLocale);
    func.threeDaysWeatherFill(dataFromAPI.dataFromWeatherAPI);
  }
  if (e.target.classList.contains('settings__button_units-f')) {
    e.target.classList.add('settings__button_selected');
    element.celsiusButton.classList.remove('settings__button_selected');
    localStorage.setItem('units', 'F');
    func.currentDayWeatherFill(dataFromAPI.dataFromWeatherAPI, dataFromAPI.dataFromWeatherLocale);
    func.threeDaysWeatherFill(dataFromAPI.dataFromWeatherAPI);
  }
  if (e.target.classList.contains('settings__button_language-en')) {
    e.target.classList.add('settings__button_selected');
    element.ruButton.classList.remove('settings__button_selected');
    localStorage.setItem('lang', 'EN');
    func.currentDayWeatherFill(dataFromAPI.dataFromWeatherAPI, dataFromAPI.dataFromWeatherLocale);
    func.threeDaysWeatherFill(dataFromAPI.dataFromWeatherAPI);
    func.locationFill(dataFromAPI.dataFromOpencagedata);
  }
  if (e.target.classList.contains('settings__button_language-ru')) {
    e.target.classList.add('settings__button_selected');
    element.enButton.classList.remove('settings__button_selected');
    localStorage.setItem('lang', 'RU');
    func.currentDayWeatherFill(dataFromAPI.dataFromWeatherAPI, dataFromAPI.dataFromWeatherLocale);
    func.threeDaysWeatherFill(dataFromAPI.dataFromWeatherAPI);
    func.locationFill(dataFromAPI.dataFromOpencagedata);
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    state.city = element.searchInput.value;
    setSearchTimeLocationWeatherMap();
  }
});
