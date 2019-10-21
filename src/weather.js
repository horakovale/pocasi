import getWeatherIcon from "./weather-icons";

const apiKey = 'f85449b03164b547cbfea3ae86579dfe';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

export default class Weather {

    constructor() {

        this.mestoEl = document.querySelector('#mesto');
        this.teplotaEl = document.querySelector('#teplota');
        this.popisEl = document.querySelector('#popis');
        this.ikonaEl = document.querySelector('#ikona');
        this.vlhkostEl = document.querySelector('#vlhkost');
        this.vitrEl = document.querySelector('#vitr');
        this.vychodEl = document.querySelector('#vychod');
        this.zapadEl = document.querySelector('#zapad');
    }

    datumZTimestamp(timestamp) {
        let datum = new Date(timestamp * 1000);
        let hodiny = datum.getHours();
        let minuty = datum.getMinutes();
        return `${hodiny} : ${minuty}`
    }

    dnesniPredpoved() {
        let query = fetch(`${apiUrl}?APPID=${apiKey}&q=Brno&units=metric&lang=cz`);

        query
            .then(response => response.json())
            .then(data => {
                this.displayWeather(data)
            })
            .catch(error => {
                console.log('Došlo k chybě');
            });
    }

    displayWeather(data) {
        let novaIkona = getWeatherIcon(data.weather[0].id, data.weather[0].icon);

        this.mestoEl.textContent = data.name;
        this.teplotaEl.textContent = Math.round(data.main.temp);
        this.popisEl.textContent = data.weather[0].description;
        this.ikonaEl.innerHTML = novaIkona;
        this.vlhkostEl.textContent = data.main.humidity;
        this.vitrEl.textContent = data.wind.speed.toFixed(1);
        this.vychodEl.textContent = this.datumZTimestamp(data.sys.sunrise);
        this.zapadEl.textContent = this.datumZTimestamp(data.sys.sunset);
    }
}