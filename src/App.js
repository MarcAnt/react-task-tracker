import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);


  useEffect(() => {

    const getTasks = async () => {
      const tasksFromSever = await fetchTasks();
      setTasks(tasksFromSever);
    }

    getTasks();

  }, [])

  // Fetch tasks 

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // fetch only one task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }



  // Este se lo pasa a Tasks --> Task y este al final es quien envia el id
  const deleteTask = async (id) => {

    // eliminar pero del json.db
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter( (task) => task.id !== id ))
  }

  // Add task

  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks/', {
      method: 'POST', 
      headers: {
        'Content-type': 'aplication/json'
      }, 
      body: JSON.stringify(task)
    });

    const data = await res.json();

    setTasks([...tasks, data]);

  // const id = Date.now();
   // {id: 1617317611435, text: "fgefg", day: "geffe", reminder: true} 
  //  const newTask = {id, ...task };

  // Se envia como un array porque ese el formato que estan los datos de las tareas
  //  setTasks([...tasks, newTask]);
  }

  // Toggle reminder o cambiar marcados

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    // Actualiza el valor del reminder de ese task
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'aplication/json'
      }, 
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    // Si la tarea coincide con el id, se cambia el valor del reminder segun sea false o true, sino se mandan todas las tareas
    setTasks(
      tasks.map( (task) => 
      
        task.id === id ? {...task, reminder: !data.reminder} : task
        
        ) 
      )
  }

  return (
    <Router>

      <div className="container">
      
        
        <Route path="/" exact render={(props) => (
          
          <>

            <Header onAdd={ () => setShowAddTask(!showAddTask) } showAdd={showAddTask} />
            {/* Al cambiar el valor de showAddTask de true a false y viceversa */}
            { showAddTask && <AddTask onAdd={addTask} />}
    
            { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}  /> : "No Tasks to Show" }
            
            
          </>

        )}/>
        
        <Route path="/about" component={About}/>
        <Footer/>
      </div>

    </Router>
  );
}

export default App;
