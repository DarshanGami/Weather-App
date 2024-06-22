const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');

// INITIALY DEFINE cityInput VAR.
let city = "Gandhinagar";
fetchWeatherData(city);
let timeOfDay = "day";
app.style.backgroundImage = `url(./image/day/cloudy.jpg)`;

// ADD EVENT LISTENER ON SUBMIT BUTTUN.
form.addEventListener('submit', (e) => {

    if (search.value.length == 0) {
        // IF EMPTY INPUT.
        alert('please type in a city name');
    } else {
        // SEARCH INPUT AND CALL FETCH-FUNCTION.
        city = search.value;
        fetchWeatherData(city);
        search.value = "";
    }
    e.preventDefault();
});


async function fetchWeatherData(city) {

    // FETCH API AND GET DATA LIKE...TEMP, HUMINITY, WIND.
    const api_key = "47afe560c0024b70c637772eeaa73414";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;  // API FORM - OPENWEATHERMAP.

    Set_Time(city);

    // CONVERT RESPONSE TO JSON FORMAT
    const weather_data = await fetch(`${URL}`)
    .then(response => response.json())
    .then(weather_data => {

        console.log(weather_data);

        // CHANGE IN INNER-HTML DISCRIPTION LIKE - TEMP, HUMIDITY, WIND.
        nameOutput.innerHTML = city;
        temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}&#176`;
        conditionOutput.innerHTML = `${weather_data.weather[0].description}`;
        humidityOutput.innerHTML = `${weather_data.main.humidity}%`;
        windOutput.innerHTML = `${weather_data.wind.speed}Km/H`;
        
        // CHANGE BACKGROUND - BY TIMEOFDAY (DAY OR NIGHT) AND CLOUD POSSITION.
        switch(weather_data.weather[0].main){
            case 'Clouds':
                app.style.backgroundImage = `url(./image/${timeOfDay}/cloudy.jpg)`;
                break;
            case 'Clear':
                app.style.backgroundImage = `url(./image/${timeOfDay}/clear.jpg)`;
                break;
            case 'Rain':
                app.style.backgroundImage = `url(./image/${timeOfDay}/rainy.jpg)`;
                break;
            case 'Mist':
                app.style.backgroundImage = `url(./image/${timeOfDay}/mist.jpg)`;
                break;
            case 'Snow':
                app.style.backgroundImage = `url(./image/${timeOfDay}/snowy.jpg)`;
                break;
            default :
                app.style.backgroundImage = `url(./image/${timeOfDay}/cloudy.jpg)`;
                break;
        }
    })
    .catch(error => {
        // console.error('Error fetching weather data:', error);
        alert('City not found, please try again');
        nameOutput.innerHTML = "Gandhinagar";
    });
}


// SET TIME
async function Set_Time(city){

    const time_api_key = "0f35f6122a2a4b68bc7103834241806";
    const time_URL = `https://api.weatherapi.com/v1/current.json?key=0f35f6122a2a4b68bc7103834241806&q=${city}`;

    const time_data = await fetch(`${time_URL}`)
    .then(response => response.json())
    .then(time_data => {
        console.log(time_data);

        // FIND DAY MONTH YEAR AND TIME.
        const all_detail = String(new Date());
        const week_day = all_detail.substr(0,3);
        // console.log(all_detail);
        const date = time_data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        timeOutput.innerHTML = time;
        dateOutput.innerHTML = `${week_day} ${d}-${m}-${y}`;
        let hours = date.substr(11, 2);
        // console.log(hours);
        const isDayTime = hours > 6 && hours < 20;
        timeOfDay = isDayTime ? "day" : "night";
        btn.style.background = timeOfDay === "night" ? "#0c45b0" : "#2b7aca";
    })
    .catch(error => {
        console.log("error in data_time");
    });
}
