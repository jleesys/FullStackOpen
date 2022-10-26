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

  const [counter, setCounter] = useState(0);
  const [leftClick, setLeft] = useState(0);
  const [rightClick, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setLeft(leftClick + 1);
    setAll(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setRight(rightClick + 1);
    setAll(allClicks.concat('R'))
  }

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


  setTimeout(() => {
    setCounter(counter + 1)
  },1000);

  return (
    <>
      <Header courseName={course.name} />
      <Content contents={course.parts} />
      <Total total={course.parts} />
      <Counter counter={counter} />
      <Button onClick={handleLeftClick} text={leftClick} />
      <Button onClick={handleRightClick} text={rightClick} />
      <p>the score <br/>{allClicks}</p>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Counter = (props) => {

  return (
    <p>dont mind me. im just a random counter {props.counter}</p>
  )
  /*
  const [counter, changeState] = useState(0);

  setTimeout( function() {
    changeState(counter + 1)
  }, 1000);


  return (
  <div>dont mind me im a random counter. watch me go... {counter}</div>
  )
  */
}

export default App