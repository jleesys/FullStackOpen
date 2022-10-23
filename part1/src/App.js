// added three components per exercise intstructions
const Header = (props) => {
  return (
    <h1>Course name: {props.courseName}</h1>
  )
}
const Content = (props) => {
  return (
    <p>
      {props.title} {props.exercisesNum}
    </p>
  )
}
const Total = (props) => {
  return(
  <p>
    Number of exercises {props.total}
  </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
    <Header courseName={course} />
    <Content title={part1} exercisesNum={exercises1}/>
    <Content title={part2} exercisesNum={exercises2}/>
    <Content title={part3} exercisesNum={exercises3}/>
    <Total total={exercises1+exercises2+exercises3} />
    </>
  )
  /*
  //commenting out the original return statement
  return (
    <div>
      <h1>{course}</h1>
      <p>
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
  */
}

export default App