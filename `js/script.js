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