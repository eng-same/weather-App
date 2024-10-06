document.getElementById('getWeatherBtn').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  if (location) {
      getWeather(location);
  } else {
      alert('Please enter a location.');
  }
});

async function getWeather(location) {
  const apiKey = 'e7553025234ae09fa07dfacb22af3476';  // Replace with your Weatherstack API key
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
          document.getElementById('weather').innerHTML = `<p>${data.error.info}</p>`;
      } else {
          const { current, location } = data;
          const weatherHTML = `
              <h2>Weather in ${location.name}, ${location.country}</h2>
              <img src="${current.weather_icons[0]}" alt="Weather Icon" class="weather-icon" />
              <p><strong>Temperature:</strong> ${current.temperature}°C</p>
              <p><strong>Weather:</strong> ${current.weather_descriptions[0]}</p>
              <p><strong>Wind Speed:</strong> ${current.wind_speed} km/h</p>
              <p><strong>Humidity:</strong> ${current.humidity}%</p>
              <p><strong>Pressure:</strong> ${current.pressure} mb</p>
          `;
          document.getElementById('weather').innerHTML = weatherHTML;
      }
  } catch (error) {
      document.getElementById('weather').innerHTML = `<p>Failed to fetch weather data.</p>`;
      console.error('Error:', error);
  }
}