import './styles/styles.css';
import { Loader } from '@googlemaps/js-api-loader';

const fetch = require('node-fetch');

function setBackgroundOfBody() {
  const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=PvaQ97N4zKTuWsCueVfxswth-KG0q6AR3EKzVQVEy4s&query=city&per_page=1&orientation=landscape';
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.body.style.backgroundImage = `url('${data.urls.regular}')`;
    });
}

setBackgroundOfBody();

const currentGeoData = {
  lat: -34.397,
  lng: 150.644,
};

navigator.geolocation.getCurrentPosition((data) => {
  currentGeoData.lat = data.coords.latitude;
  currentGeoData.lng = data.coords.longitude;
});

const loader = new Loader({
  apiKey: 'AIzaSyAyI_32OuCXuiz43WSoMkQlcdmQOFjnu2k',
  version: 'weekly',
});

let map;
loader.load().then(() => {
  map = new google.maps.Map(document.querySelector('.geolocation__map'), {
    center: currentGeoData,
    zoom: 8,
  });
});
