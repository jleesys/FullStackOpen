const App = () => {
  const course = {
    name: 'Half Stack applications development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
  }

  //  const course = 'Half Stack application dev';
  //
  //  const parts = [
  //    {
  //      name: 'Fundamentals of React',
  //      exercises: 10,
  //    },
  //    {
  //      name: 'Using props to pass data',
  //      exercises: 7,
  //    },
  //    {
  //      name: 'State of a component',
  //      exercises: 14,
  //    },
  //  ]

  //exercise 1.3
  //  const part1 = {
  //    name: 'Fundamentals of React',
  //    exercises: 10
  //  }
  //  const part2 = {
  //    name: 'Using props to pass data',
  //    exercises: 7
  //  }
  //  const part3 = {
  //    name: 'State of a component',
  //    exercises: 14
  //  }

  //orig variables
  //  const part1 = 'Fundamentals of React';
  //  const exercises1 = 10;
  //  const part2 = 'Using props to pass data';
  //  const exercises2 = 7;
  //  const part3 = 'State of a component';
  //  const exercises3 = 14;

  const Header = (props) => {
    return (
      <div>
        <h1>{props.text}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <>
        <p>{props.subject} : {props.detail}</p>
      </>
    )
  }

  const Content = ({ parts }) => {
    const partsList = parts.map(part =>
      <p> {part.name} : {part.exercises}</p>
    )
    return (
      <>
        {partsList}
      </>
    )
    //return (
    //  <>
    //    <p>{subject} : {detail}</p>
    //  </>
    //)
  }

  const Total = ({ parts }) => {
    let total = 0;
    parts.forEach((part) => {
      total += part.exercises;
    })
    return (
      <>
        <p>Total number of exercises : {total}</p>
      </>
    )
  }

  return (
    <div>
      <Header text={course.name}></Header>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
