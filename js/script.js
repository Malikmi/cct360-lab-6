const cities = {
  toronto: { name: "Toronto", latitude: 43.65, longitude: -79.38 },
  karachi: { name: "Karachi", latitude: 24.86, longitude: 67.01 }
};

const citySelect = document.getElementById("city");
const refreshButton = document.getElementById("refresh");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const clouds = document.getElementById("clouds");
const mood = document.getElementById("mood");
const status = document.getElementById("status");

function showTemperatureTheme(degrees) {
  if (degrees < 10) {
    document.body.className = "cold";
    mood.textContent = "Cold palette · below 10°C";
  } else if (degrees < 25) {
    document.body.className = "mild";
    mood.textContent = "Mild palette · 10°C to below 25°C";
  } else {
    document.body.className = "warm";
    mood.textContent = "Warm palette · 25°C and above";
  }
}

async function getWeather() {
  const city = cities[citySelect.value];
  const url = "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${city.latitude}&longitude=${city.longitude}` +
    "&current=temperature_2m,wind_speed_10m,cloud_cover&timezone=auto";

  citySelect.disabled = true;
  refreshButton.disabled = true;
  cityName.textContent = city.name;
  temperature.textContent = "—";
  wind.textContent = "—";
  clouds.textContent = "—";
  mood.textContent = "";
  document.body.className = "";
  status.textContent = "Loading weather…";

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Weather request failed");
    }

    const data = await response.json();
    const current = data.current;

    temperature.textContent = current.temperature_2m + "°C";
    wind.textContent = current.wind_speed_10m + " km/h";
    clouds.textContent = current.cloud_cover + "%";
    showTemperatureTheme(current.temperature_2m);
    status.textContent = "Weather time · " + current.time.replace("T", " ") + " local";
  } catch (error) {
    status.textContent = "Couldn’t load weather. Try Refresh weather.";
    console.error(error);
  } finally {
    citySelect.disabled = false;
    refreshButton.disabled = false;
  }
}

citySelect.addEventListener("change", getWeather);
refreshButton.addEventListener("click", getWeather);
getWeather();
