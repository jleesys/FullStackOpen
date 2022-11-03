const Courses = ({courses}) => {
    return (
      <>
        {courses.map((courseObj) => 
          <Course key={courseObj.id} course={courseObj} />)} 
      </>
    )
  }

  export default Courses;