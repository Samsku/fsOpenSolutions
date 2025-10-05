const Header = ({course}) => {
    return <h1>{course}</h1>
}

const Part = ({part, exercises}) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map((part => (
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )))}
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0)
    return <p><strong>Number of exercises {total}</strong></p>
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
