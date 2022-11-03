import { useState } from 'react'
import Course from './components/Course'

const Courses = ({courses}) => {
  return (
    <>
      {courses.map((courseObj) => 
        <Course course={courseObj} />)} 
    </>
  )
}

/*
const Course = ({ course }) => {
  const { parts, id, name } = course;

  const total = (parts) => {
    let sumOfParts = parts.reduce((s, p) => {
      console.log(s, p);
      return s + p.exercises}, 0);

    return sumOfParts;
  }


  return (
    <>
      <h1>{name}</h1>
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <p><strong>total of {total(parts)} exercises</strong></p>
    </>
  )
}
*/

const App = () => {


  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  // return <Course course={course} />

  return (
    <Courses courses={courses} />
  )
}

export default App