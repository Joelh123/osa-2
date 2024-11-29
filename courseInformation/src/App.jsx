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
  <h1>{header}</h1>
)

const Course = ({ course }) => {

  return (
    <div>
      <Header header={course.name} />
      <Content content={course.parts} />
    </div>
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
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App