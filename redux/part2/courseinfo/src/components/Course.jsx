const Header = (props) => {
    return (
        <>
            <h1>{props.text}</h1>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => {
                return <Part part={part} key={part.id} />
            })}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({parts}) => {
    const exercises = parts.map((part) => part.exercises)
    console.log('exercises array ,', exercises);
    return (
        <p>
            total of {exercises.reduce((sum,part) => sum + part)}
            <br />
            total of {parts.reduce((acc,currentVal) => acc + currentVal.exercises,
            0)}
        </p>
    )
}

const Course = ({ course }) => {
    console.log(course.parts);
    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </>

    );
}

export default Course;