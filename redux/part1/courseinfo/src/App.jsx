const App = () => {
  const course = 'Half Stack application dev';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const Header = (props) => {
    return (
      <div>
        <h1>{props.text}</h1>
      </div>
    )
  }

  const Content = ({subject, detail}) => {
    return (
      <>
        <p>{subject} : {detail}</p>
      </>
    )
  }

  const Total = ({sumExercises}) => {
    return (
      <>
      <p>Number of exercises : {sumExercises}</p>
      </>
    )
  }

  return (
    <div>
      <Header text={course}></Header>
      <Content subject={part1} detail={exercises1} />
      <Content subject={part2} detail={exercises3} />
      <Content subject={part3} detail={exercises3} />
      <Total sumExercises={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App
