const Result = ({results}) => {
  const max_results_length = 10
  if (results.length > max_results_length) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if (results.length === 1) {
    const country = results[0]
    console.log(country)
    console.log(Object.values(country.languages))
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

  return (
    <div>
      {results.map(result => 
        <p key={result.name.common}>
          {result.name.common}
        </p>
      )}
    </div>
  )
}

export default Result