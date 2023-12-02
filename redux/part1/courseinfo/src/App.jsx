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

  const Part = (props) => {
    return (
      <>
        <p>{props.subject} : {props.detail}</p>
      </>
    )
  }

  const Content = (props) => {
    return (
      <>
        <Part subject={props.part1} detail={props.exercises1} />
        <Part subject={props.part2} detail={props.exercises2} />
        <Part subject={props.part3} detail={props.exercises3} />
      </>
    )
    //return (
    //  <>
    //    <p>{subject} : {detail}</p>
    //  </>
    //)
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
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <Total sumExercises={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App
