import { useState } from 'react'

const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={props.handleGoodClick} text={props.goodText}/>
      <Button handleClick={props.handleNeutralClick} text={props.neutralText}/>
      <Button handleClick={props.handleBadClick} text={props.badText}/>
    </div>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.neutral + props.bad}</p>
      <p>average {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</p>
      <p>positive {props.good / (props.good + props.neutral + props.bad) * 100}%</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback 
        handleGoodClick={() => setGood(good + 1)} goodText='good'
        handleNeutralClick={() => setNeutral(neutral + 1)} neutralText='neutral'
        handleBadClick={() => setBad(bad + 1)} badText='bad'
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>    
  );
}

export default App;
