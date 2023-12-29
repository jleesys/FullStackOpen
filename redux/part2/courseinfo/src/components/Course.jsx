const Header = (props) => {
    return (
        <>
            <h1>{props.text}</h1>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <ul>
            {parts.map((part) => {
                return <Part part={part} key={part.id} />
            })}
        </ul>
    )
}

const Part = ({ part }) => {
    return (
        <li>
            {part.name} {part.exercises}
        </li>
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