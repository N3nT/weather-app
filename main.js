import axios from 'axios'
import './style.scss'

const cityName = document.querySelector('.box__left-weather-info-city')
const tempContent = document.querySelector('.box__left-weather-info-temp')
const dataInfo = document.querySelector('.box__left-weather-info-date')

const searchButton = document.querySelector('.box__right-btn')
const cityInput = document.querySelector('.box__right-input')
const pressure = document.querySelector('.box__right-info-pressure')
const humidity = document.querySelector('.box__right-info-humidity')
const maxTemp = document.querySelector('.box__right-info-maxtemp')
const minTemp = document.querySelector('.box__right-info-mintemp')
const visibility = document.querySelector('.box__right-info-visibility')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'a1f28905bb879b4ebe17972bf2fe8cf6'
const API_UNITS = '&units=metric'

const getTime = () => {
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	const date = new Date()
	const year = date.getFullYear()
	const monthName = months[date.getMonth()]
	const dayName = days[date.getDay()]
	const dayNum = date.getDate()
	const hours = date.getHours()
	let minutes

	if (date.getMinutes() < 10) {
		minutes = `0${date.getMinutes()}`
	} else {
		minutes = date.getMinutes()
	}

	dataInfo.textContent = `${hours}:${minutes} - ${dayName}, ${dayNum} ${monthName} ${year}`
}

const getWeather = () => {
	const city = cityInput.value || 'Brzesko'
	const URL = API_LINK + city + API_UNITS + `&appid=${API_KEY}`

	axios.get(URL).then((resposne) => {
		const data = resposne.data
		console.log(data);
    writeData(data)
	})
}

const setCookie = (name, value) => {
	document.cookie = `${name} = ${value}; expires=24*60*60*1000;`
}

const writeData = (data) => {
	cityName.textContent = data.name
	tempContent.innerHTML = `${Math.floor(data.main.feels_like)}&deg;`
	pressure.textContent = `Pressure: ${data.main.pressure} hPa`
	humidity.textContent = `Humidity: ${data.main.humidity} %`
  maxTemp.innerHTML = `Max. temp: ${Math.floor(data.main.temp_max)}&deg;C`
  minTemp.innerHTML = `Min. temp: ${Math.floor(data.main.temp_max)}&deg;C`
  if(data.visibility < 1000){
    visibility.textContent = `Visibility: ${data.visibility} m`
  } else {
    visibility.textContent = `Visibility: ${data.visibility/1000} km`
  }
}

document.addEventListener('load', getWeather(), getTime())
searchButton.addEventListener('click', getWeather)
cityInput.addEventListener('keydown', (e) => {
	if (e.code === 'Enter') {
		getWeather()
	}
})
setCookie('name', '123')
