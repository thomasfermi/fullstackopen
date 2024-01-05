
const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Part = ({part}) => {
  return <p> {part.name} {part.exercises} </p>
}

const Content = ({parts}) => {
  const part_components = parts.map(part => (
    <Part key={part.id} part={part} />
  ));

  return (
    <div>
      {part_components}
    </div>
  )
}

const Total = ({num_excercises}) => {
  return <p><b>Number of exercises {num_excercises}</b></p>
}

const Course = ({course}) => {
  let num_exercises= course.parts.map(p => p.exercises)
                                 .reduce((partialSum, a) => partialSum + a)
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />      
      <Total num_excercises={num_exercises} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default App