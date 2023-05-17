import { useState } from 'react'
import { getWeatherData } from '../services/weather'

const Result = ({country}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [weather, setWeather] = useState(null)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  if (!isVisible) {
    return (
      <div>
        <p>{country.name.common}</p>
        <button onClick={toggleVisibility}>
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }

  getWeatherData(country.latlng[0], country.latlng[1])
    .then(response => setWeather(response))

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>
            {language}
          </li>
        )}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      <h2>Weather in {country.capital}</h2>
      {weather !== null && <p>temperature {weather.current.temp} Celsius</p>}
      {weather !== null && <p>wind {weather.current.wind_speed} m/s</p>}
    </div>
  )
}

export default Result