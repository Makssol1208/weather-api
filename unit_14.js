// API url и ключ;

const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "876d010625961e694966e02d1ac57a2b"
}

// Создаём тег Select;

const select = document.createElement('select');
select.id = 'city';

// Создаём Object с городами;

const cities =  {
    2643743 : "London",
    625144 : "Minsk",
    3099434 : "Gdansk",
    703448 : "Kyiv", 
}

// Перебираем Object и добавляем option с аттрибутом value(ключ объекта);
// Присваиваем название города(элемент объекта) и добавляем это всё к select;

for (let key in cities) {
    let option = document.createElement('option');
    option.setAttribute('value', key);
    option.textContent = `${cities[key]}`;
    select.append(option);
}

// Выводим Select на страницу;
document.querySelector('.card-info').append(select);

// Получаем данные о погоде;

function getWeather() {
    const cityId = document.querySelector('#city').value;
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);
}

// Перечисляем желаемые выводы погодных параметров;

function showWeather(data) {
    document.querySelector('.out').innerHTML = Math.round(data.main.temp) + '&deg';
    document.querySelector('.desc').textContent = data.weather[0]['description'];
    document.querySelector('.wind').textContent =`Wind speed - ${Math.round(data.wind.speed)} m/s`;
    document.querySelector('.humidity').textContent =`Humidity - ${data.main.humidity} %`;
    document.querySelector('.press').textContent =`Atmospheric pressure - ${Math.round(data.main.pressure)} hPa`;
    document.querySelector('.card-img').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
}

// Отображаем погоду на странице;

getWeather();
document.querySelector('#city').onchange = getWeather;
