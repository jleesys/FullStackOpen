const Courses = ({courses}) => {
    return (
      <>
        {courses.map((courseObj) => 
          <Course key={courseObj.id} course={courseObj} />)} 
      </>
    )
  }

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

  export default Courses;