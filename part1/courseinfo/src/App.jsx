const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <p key={i}>
          {part.part} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Total = ({ num }) => {
  return <p>Number of exercises {num}</p>;
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total num={total} />
    </div>
  );
};

export default App;
