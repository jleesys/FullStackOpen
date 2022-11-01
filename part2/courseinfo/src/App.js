import { useState } from 'react'

const Course = ({course}) => {
  const {parts,id,name} = course;
  let sum = 0;
  for (let i = 0; i < parts.length; i++) sum += parts[i].exercises
  console.log('loggly', parts, sum);
  return (
    <>
      <h1>{name}</h1>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <p><strong>total of {sum} exercises</strong></p>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App