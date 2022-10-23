// added three components per exercise intstructions
const Header = (props) => {
  return (
    <h1>Course name: {props.courseName}</h1>
  )
}
const Content = (props) => {
  const arrayOfParts = props.contents;

  return (
    <div>
      <Part partContents={arrayOfParts[0]} />
      <Part partContents={arrayOfParts[1]} />
      <Part partContents={arrayOfParts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.partContents.part} {props.partContents.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
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

  const thing1 = {
    part: part1,
    exercises: exercises1
  }
  const thing2 = {
    part: part2,
    exercises: exercises2
  }
  const thing3 = {
    part: part3,
    exercises: exercises3
  }

  const arrayThings = [thing1,thing2,thing3];
  console.log(arrayThings);

  return (
    <>
      <Header courseName={course} />
      <Content contents={arrayThings} />
      <Total total={exercises1+exercises2+exercises3} />
    </>
  )
}

export default App