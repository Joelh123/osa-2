const Part = ({ exerciseName, exercises }) => (
  <p>{exerciseName} {exercises}</p>
)

const Content = ({ content }) => {
  return (
    <div>
      {content.map(part => 
        <Part key={part.id} exerciseName={part.name} exercises={part.exercises} />
      )}
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
      }
    ]
  }

  return <Course course={course} />
}

export default App