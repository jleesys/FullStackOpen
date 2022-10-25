import {useState} from 'react' 
// added three components per exercise intstructions
const Header = (props) => {
  return (
    <h1>Course name: {props.courseName}</h1>
  )
}
const Content = (props) => {
  console.log(props.contents);
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
      {props.partContents.name} {props.partContents.exercises}
    </p>
  )
}

const Total = (props) => {
  console.log(props.total);
  let sum = 0;
  const arrayOfParts = props.total;
  arrayOfParts.forEach(value => sum += value.exercises);

  return (
    <p>
      Number of exercises {sum}
    </p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <>
      <Header courseName={course.name} />
      <Content contents={course.parts} />
      <Total total={course.parts} />
      <Counter />
    </>
  )
}

const Counter = (props) => {
  const [counter, changeState] = useState(0);

  setTimeout( function() {
    changeState(counter + 1)
  }, 1000);


  return (
  <div>dont mind me im a random counter. watch me go... {counter}</div>
  )
}

export default App