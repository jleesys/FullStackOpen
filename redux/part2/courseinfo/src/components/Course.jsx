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

const Course = ({ course }) => {
    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
        </>

    );
}

export default Course;