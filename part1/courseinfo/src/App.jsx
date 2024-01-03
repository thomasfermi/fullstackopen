
const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({part}) => {
  return <p> {part.name} {part.exercises} </p>
}

const Content = ({parts}) => {
  const part_components = parts.map((part, index) => (
    <Part key={index} part={part} />
  ));

  return (
    <div>
      {part_components}
    </div>
  )
}

const Total = ({num_excercises}) => {
  return <p>Number of exercises {num_excercises}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  let num_exercises= parts.map(p => p.exercises)
                          .reduce((partialSum, a) => partialSum + a)

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />      
      <Total num_excercises={num_exercises} />
    </div>
  )
}

export default App