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

const StatisticLine = (props) => {
  return (
    <div>
      {props.name} {props.value}
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
      <table>
        <tr>
          <td><StatisticLine name='good' value={props.good} /></td>
        </tr>
        <tr>
          <td><StatisticLine name='neutral' value={props.neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine name='bad' value={props.bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine name='all' value={props.good + props.neutral + props.bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine name='average' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} /></td>
        </tr>
        <tr>
          <td><StatisticLine name='positive' value={props.good / (props.good + props.neutral + props.bad) * 100 + '%'} /></td>
        </tr>
      </table>
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
