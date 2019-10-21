import getWeatherIcon from "./weather-icons";

const apiKey = 'f85449b03164b547cbfea3ae86579dfe';
const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast';


export default class Forecast {

    constructor() {
        this.forecastElement = document.querySelector('#predpoved')
    }

    predpoved() {
        let query = fetch(`${apiUrlForecast}?APPID=${apiKey}&q=Brno&units=metric&lang=cz`);

        query
            .then(response => response.json())
            .then(data => {
                this.displayForecast(data)
            })
            .catch(error => {
                console.log('Došlo k chybě');
            });
    }

    denZTimestamp(timestamp) {
        let datum = new Date(timestamp * 1000);
        let denVTydnu = '';
        if (datum.getDay() === 1) {
            denVTydnu = 'Pondělí';
        } else if (datum.getDay() === 2) {
            denVTydnu = 'Úterý';
        } else if (datum.getDay() === 3) {
            denVTydnu = 'Středa';
        } else if (datum.getDay() === 4) {
            denVTydnu = 'Čtvrtek';
        } else if (datum.getDay() === 5) {
            denVTydnu = 'Pátek';
        } else if (datum.getDay() === 6) {
            denVTydnu = 'Sobota';
        } else {
            denVTydnu = 'Neděle';
        }
        return `${denVTydnu} ${datum.getDate() + 1}.${datum.getMonth() + 1}.`
    }

    displayForecast(data) {

        let dny = [];
        dny.push(data.list[8]);
        dny.push(data.list[16]);
        dny.push(data.list[24]);
        dny.push(data.list[32]);

        let html = '';
        dny.forEach(den => {
            let ikonka = getWeatherIcon(den.weather[0].id, den.weather[0].icon);
            let teplota = Math.round(den.main.temp);
            let datum = this.denZTimestamp(den.dt);
            html = html + `
                <div class="forecast">
                     <div class="forecast__day">${datum}</div>
                    <div class="forecast__icon">${ikonka}</div>
                    <div class="forecast__temp">${teplota} °C</div>
                </div>      
                `;
        });

        this.forecastElement.innerHTML = html;
    }
}