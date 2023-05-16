import Result from './Result'

const Results = ({results}) => {
  const max_results_length = 10
  if (results.length > max_results_length) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if (results.length === 1) {
    return (
      <Result country={results[0]} />
    )
  }

  return (
    <div>
      {results.map(country => <Result key={country.name.common} country={country} />)}
    </div>
  )
}

export default Results