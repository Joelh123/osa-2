const Part = ({ exerciseName, exercises }) => (
    <p>{exerciseName} {exercises}</p>
)
  
const Content = ({ content }) => {
    const sum = content.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        {content.map(part =>
          <Part key={part.id} exerciseName={part.name} exercises={part.exercises} />
        )}
        <p><b>total of {sum} exercises</b></p>
      </div>
    )
}
  
const Header = ({ header }) => (
    <h2>{header}</h2>
)
  
const Course = ({ course }) => {

    return (
      <div>
        <Header header={course.name} />
        <Content content={course.parts} />
      </div>
    )
}

export default Course