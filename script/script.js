const musicApp = {};

musicApp.endpoint = `https://ws.audioscrobbler.com/2.0/`;
musicApp.apiKey = `2427bfdd2397d2c3f871833deb2a66b8`;
musicApp.method = `chart.gettopartists`;
musicApp.format = `json`;
musicApp.limit = '';

musicApp.init = () => {
  musicApp.getArtist();
};

musicApp.getArtist = function () {
  const lastFmUrl = new URL(musicApp.endpoint);

  lastFmUrl.search = new URLSearchParams({
    api_key: musicApp.apiKey,
    method: musicApp.method,
    format: musicApp.format,
  });

  fetch(lastFmUrl)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      musicApp.dropdownOptions(jsonData);
      musicApp.randomArtist(jsonData);
    })
    .catch(function () {
      alert('Your request could not be retrieved');
    });
};

// Grab the names of the artists and populate it in the dropdown menu.
// The function needs to create 'option' and put the names of the artists in the drop down menu.
// Add a value attribute and make it equal to the artist's name.
// then at the end add a click event listener to see what user selects.
// Append user's choice onto the page with name, playcount, and url

musicApp.dropdownOptions = (objectOfArtists) => {
  const select = document.querySelector('select');
  const artistArray = objectOfArtists.artists.artist;

  artistArray.forEach((individualArtist) => {
    const optionEl = document.createElement('option');
    optionEl.innerText = `${individualArtist.name}`;
    select.appendChild(optionEl);

    optionEl.addEventListener('click', () => {
      const artistInfoSection = document.querySelector('.artistInfo');

      artistInfoSection.innerHTML = `<h3>${individualArtist.name}</h3>
                <h4>Play Count: ${individualArtist.playcount}</h4>
                <p><a href="${individualArtist.url}" target="_blank">Last.fm Profile</a>
                </p>`;
    });
  });
};

musicApp.randomArtist = (objectOfArtists) => {
  const randomButton = document.querySelector('#randomizer');

  randomButton.addEventListener('click', () => {
    const randomArray = objectOfArtists.artists.artist;
    const recommend = Math.floor(Math.random() * randomArray.length);

    const artistInfoSection = document.querySelector('.artistInfo');

    artistInfoSection.innerHTML = `<h3>${randomArray[recommend].name}</h3>
                <h4>Play Count: ${randomArray[recommend].playcount}</h4>
                <p><a href="${randomArray[recommend].url}" target="_blank">Last.fm Profile</a>
                </p>`;
  });
};

musicApp.init();
