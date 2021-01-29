import './styles/styles.css';

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
