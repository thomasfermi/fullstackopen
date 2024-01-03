
const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Content = ({part_name, exercises}) => {
  return <p> {part_name} {exercises} </p>
}

const Total = ({num_excercises}) => {
  return <p>Number of exercises {num_excercises}</p>
}

const App = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course='Half Stack application development'/>
      <Content part_name={part1} exercises={exercises1} />
      <Content part_name={part2} exercises={exercises2} />
      <Content part_name={part3} exercises={exercises3} />
      <Total num_excercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App