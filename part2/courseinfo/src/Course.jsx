const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {" "}
      {part.name} {part.exercises}{" "}
    </p>
  );
};

const Content = ({ parts }) => {
  const part_components = parts.map((part) => (
    <Part key={part.id} part={part} />
  ));

  return <div>{part_components}</div>;
};

const Total = ({ num_excercises }) => {
  return (
    <p>
      <b>Number of exercises {num_excercises}</b>
    </p>
  );
};

const Course = ({ course }) => {
  let num_exercises = course.parts
    .map((p) => p.exercises)
    .reduce((partialSum, a) => partialSum + a);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total num_excercises={num_exercises} />
    </div>
  );
};

export default Course;
