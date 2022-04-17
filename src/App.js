import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { BsPlus } from 'react-icons/bs'
import Vanta from './Vanta'

const App = (props) => {

  const [tasks, setTasks] = useState([
  ])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(localStorage.getItem('status') ? JSON.parse(localStorage.getItem('status')) : 'all')

  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(status))
  }, [status])
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('tasks')) !== null) {
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  const addTask = (event) => {
    event.preventDefault();
    if (tasks.filter(item => item.title === event.target[0].value).length) {
      alert('Already has')
    } else {
      setTasks([...tasks, {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: event.target[0].value,
        isActive: true,
        isDone: false,
        isImportant: false,
        time: toDate(new Date()).toLocaleString()
      }])
    }
    event.target[0].value = ''
  }
  function toDate(date) {
    return new Intl.DateTimeFormat('en-En', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(item => {
      return item.id !== id
    }))
  }

  const doneHandler = (id) => {
    setTasks(tasks.map(item => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone }
      } else {
        return item
      }
    }))
  }

  const importantHandler = (id) => {
    setTasks(tasks.map(item => {
      if (item.id === id) {
        return { ...item, isImportant: !item.isImportant }
      } else {
        return item
      }
    }))
  }

  const deleteAllHandler = () => {
    setTasks(tasks.filter(item => !item.isDone))
  }


  return (
    <div className="App">
      <Vanta />

      <div className='todo-content'>
        <div>
          <h1>Todo List</h1>
          <p>
            <span>{tasks.length}</span> tasks to done <span>{tasks.filter(item => item.isDone).length}</span>
          </p>
        </div>
        <form onSubmit={addTask} className="form">
          <input disabled={status === 'done' || status === 'important'} maxLength={20} className='form-input' required type='text' placeholder='add task' />
          <button disabled={status === 'done' || status === 'important'} className='form-btn' type='submit'><BsPlus /></button>
        </form>

        {tasks.length === 0 ?
          <h3 className='empty'>Ваш список задач пуст</h3>
          : tasks.filter(item => item.isDone).length === 0 && status === 'done' ? <h3 className='empty'>Ваш список выполеных задач пуст</h3> :
            tasks.filter(item => item.isImportant).length === 0 && status === 'important' ? <h3 className='empty'>Ваш список важных задач пуст</h3> :

              tasks.filter(item => {
                return item.title.toLowerCase().startsWith(search.toLowerCase())
              }).length === 0 ?
                <h3 className='empty'>не найдено</h3>
                :
                <ul className='list'>
                  {
                    tasks.filter(item => {
                      if (status === 'done') {
                        return item.isDone
                      } else if (status === 'important') {
                        return item.isImportant
                      } else {
                        return item
                      }

                    }).filter(item => {
                      return item.title.toLowerCase().startsWith(search.toLowerCase())
                    })
                      .map((item) => (
                        <li className='list-item' key={item.id} >
                          <span style={{ color: 'black' }}>{item.time}</span>
                          <button className='done-btn' type='button' style={{ background: item.isDone ? 'green' : '' }} onClick={() => doneHandler(item.id)}>done</button>
                          <span className='title' style={{ textDecoration: item.isDone ? 'line-through' : 'none', color: item.isImportant ? 'gold' : 'black' }}> {item.title} </span>
                          <button className='important-btn' style={{ background: item.isImportant ? 'red' : '' }} type='button' onClick={() => importantHandler(item.id)}>Important</button>
                          <button className='delete-btn' type='button' onClick={() => deleteTask(item.id)}><FaTrash /></button>
                        </li>


                      ))
                  }
                </ul>
        }
        <input className='search' type='search' placeholder="search" value={search} onChange={(event) => setSearch(event.target.value)} />
        {tasks.length ? <button className='clear-btn' type='button' onClick={deleteAllHandler}> Delete all Done </button> : ''}
        <div>
          <button type='button' onClick={() => setStatus('all')} style={{ background: status === 'all' ? 'green' : '' }}>All</button>
          <button type='button' onClick={() => setStatus('done')} style={{ background: status === 'done' ? 'green' : '' }}>Done</button>
          <button type='button' onClick={() => setStatus('important')} style={{ background: status === 'important' ? 'green' : '' }}>Important</button>
        </div>

      </div>
    </div >
  );
}

export default App;
