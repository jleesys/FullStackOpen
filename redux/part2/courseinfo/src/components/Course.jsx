const Course = ({ course }) => {
    const courseParts = course.parts;
    return (
        <>
            <ul>
                {courseParts.map((part) => <li key={part.id}>{part.name}</li>)}
            </ul>
        </>

    );
}

export default Course;