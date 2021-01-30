import './styles/styles.css';
// import { Loader } from '@googlemaps/js-api-loader';

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

let b;
function getLocationOfUser() {
  const apiUrl = 'https://ipinfo.io/json?token=97d1bb595fd2cd';
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      b = data;
    })
    .then(() => console.log(b));
}

getLocationOfUser();
console.log(b);

// const currentGeoData = {
//   lat: -34.397,
//   lng: 150.644,
// };

// const loader = new Loader({
//   apiKey: '',
//   version: 'weekly',
// });
// const mapOptions = {
//   center: {
//     lat: 0,
//     lng: 0,
//   },
//   zoom: 8,
// };

// let map;
// loader.load().then(() => {
//   getCurrentGeoData();
//   map = new google.maps.Map(document.querySelector('.geolocation__map'), mapOptions);
// });
