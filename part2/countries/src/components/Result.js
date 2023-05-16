import { useState } from 'react'

const Result = ({country}) => {
  const [isVisible, setIsVisible] = useState(false)

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
    </div>
  )
}

export default Result