import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => {
    setGood(good+1)
  }

  const onNeutralClick = () => {
    setNeutral(good+1)
  }

  const onBadClick = () => {
    setBad(good+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={onGoodClick} text="good"/>
      <Button handleClick={onNeutralClick} text="neutral"/>
      <Button handleClick={onBadClick} text="bad"/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App