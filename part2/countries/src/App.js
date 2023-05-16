import { useEffect, useState } from 'react'

import { getAll } from './services/countries'
import Result from './components/Result'

const App = () => {
  const [countries, setCountries] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    console.log('Countries changed')
    getAll().then(response => {
      const newResult = response.data.filter(country => country.name.common.toLowerCase().startsWith(countries))
      console.log('New result')
      console.log(newResult)
      setResults(newResult)
    })
  }, [countries])

  const handleCountriesChange = (event) => {
      setCountries(event.target.value)
  }

  return (
    <div className="App">
      <p>
        find countries
        <input
          value={countries}
          onChange={handleCountriesChange}
        />
      </p>
      {/* <ul>
        {results.map(result => 
          <Result
            key={result.name.common}
            country={result.name.common}
          />  
        )}
      </ul> */}
      <Result results={results}/>
    </div>
  );
}

export default App;
