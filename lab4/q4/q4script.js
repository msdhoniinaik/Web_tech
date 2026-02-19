const apiKey = "5a671583a29bd6f3e0afa056094ab096";
const weatherDiv = document.getElementById("weatherResult");
const loadingDiv = document.getElementById("loading");
const cityInput = document.getElementById("cityInput");

let lastCityCache = null;
let lastCityData = null;

function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherDiv.innerHTML = "<div class='error'>Enter a city name</div>";
        return;
    }

    if (city.toLowerCase() === lastCityCache) {
        displayWeather(lastCityData, "(From Cache)");
        return;
    }

    loadingDiv.style.display = "block";
    weatherDiv.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(res => {
        if (res.status === 401) throw new Error("Invalid API Key");
        if (res.status === 404) throw new Error("City not found");
        if (!res.ok) throw new Error("Network error");

        return res.json();
    })
    .then(data => {
        lastCityCache = city.toLowerCase();
        lastCityData = data;
        displayWeather(data);
    })
    .catch(err => {
        weatherDiv.innerHTML = `<div class="error">❌ ${err.message}</div>`;
    })
    .finally(() => {
        loadingDiv.style.display = "none";
    });
}

function displayWeather(data, cacheMsg = "") {
    weatherDiv.innerHTML = `
        <h3>${data.name} ${cacheMsg}</h3>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌥 Condition: ${data.weather[0].description}</p>
    `;
}
