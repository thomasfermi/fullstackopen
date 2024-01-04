import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>
  }   
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/all
  const positive_percent = (100.0*props.good)/all
  return (
    <p>
      good {props.good}<br/>
      neutral {props.neutral}<br/>
      bad {props.bad}<br/>
      all {all}<br/>
      average {average}<br/>
      positive {positive_percent} %
    </p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => {
    setGood(good+1)
  }

  const onNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const onBadClick = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={onGoodClick} text="good"/>
      <Button handleClick={onNeutralClick} text="neutral"/>
      <Button handleClick={onBadClick} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App