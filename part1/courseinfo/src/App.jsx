
const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({part_name, exercises}) => {
  return <p> {part_name} {exercises} </p>
}

const Content = (props) => {
  return (
    <div>
      <Part part_name={props.part1.name} exercises={props.part1.exercises}/>
      <Part part_name={props.part2.name} exercises={props.part2.exercises}/>
      <Part part_name={props.part3.name} exercises={props.part3.exercises}/>
    </div>
  )
}

const Total = ({num_excercises}) => {
  return <p>Number of exercises {num_excercises}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3} />
      <Total num_excercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App