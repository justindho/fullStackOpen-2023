import axios from 'axios'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const getWeatherData = (lat, lng) => {
    console.log(`apiKey: ${apiKey}`)
    return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}`)
}

export { getWeatherData }