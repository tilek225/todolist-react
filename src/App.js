import React, { useState } from 'react'

const App = () => {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Buy bread",
      isActive: true,
      isDone: false,
      isImportant: false
    },
    {
      id: 2,
      title: "Go out",
      isActive: true,
      isDone: false,
      isImportant: false
    },
    {
      id: 3,
      title: "Buy feed for dog",
      isActive: true,
      isDone: false,
      isImportant: false
    },
    {
      id: 4,
      title: "Go to school",
      isActive: true,
      isDone: false,
      isImportant: false
    }
  ])


  const addTask = (event) => {
    event.preventDefault();
    setTasks([...tasks, {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: event.target[0].value,
      isActive: true,
      isDone: false,
      isImportant: false
    }])
    event.target[0].value = ''
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(item => {
      return item.id !== id
    }))
  }

  const doneHandler = (id) => {
    setTasks(tasks.map(item => {
      if (item.id === id) {
        return { ...tasks, isDone: !item.isDone }
      } else {
        return item
      }
    }))
  }

  return (
    <div className="App">

      <form onSubmit={addTask}>
        <input required type='text' placeholder='add task' />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {tasks.map((item) => (
          <li key={item.id} >
            <button type='button' style={{ background: item.isDone ? 'green' : '' }} onClick={() => doneHandler(item.id)}>done</button>
            <span style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}> {item.title} </span>
            <button type='button' onClick={() => deleteTask(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
