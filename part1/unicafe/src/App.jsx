import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return <div>{props.text} {props.value}</div>
}

const Statistics = (props) => {

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>
  }   
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/all
  const positive_percent = ((100.0*props.good)/all).toString()+"%"
  return (    
    <div>
      <Table rows={
        [{text:"good", value: props.good},
         {text:"neutral", value: props.neutral},
         {text:"bad", value: props.bad},
         {text:"all", value: all},
         {text:"average", value: average},
         {text:"positive", value: positive_percent},]
       }/>
    </div>
  )
}

const Table = (props) => { 
  const entries = props.rows.map((row,index) => 
    (
      <tr key={index}>
        <td>{row.text}</td>
        <td>{row.value}</td>
      </tr>
    )
  )
  return (
    <table>
      <tbody>
        {entries}
      </tbody>
    </table>
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