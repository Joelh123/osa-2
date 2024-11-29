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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App