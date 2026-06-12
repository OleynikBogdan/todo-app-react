import { useState } from "react"

const App = () => {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    
function addTask() {
if (!task.trim()) {
  return;
}

const newTask = {
id: Date.now(),
text: task,
complete: false,

}
setTasks([...tasks, newTask]);
setTask("");
}


function deleteTask(idToDelete) {
  const updatedTasks = tasks.filter(
    (item) => item.id !==idToDelete 
  );

  setTasks(updatedTasks);

}

function toggleTask(id) {
  const updatedTasks = tasks.map((item)=>{ 
    if(item.id === id){
      return {
        ...item,
        complete: !item.complete,
      };
    }
    return item
  });
  return setTasks(updatedTasks)
}


  return (
    <div>
    <input 
    type="text"
    value={task}
    onChange={(e) => setTask(e.target.value)}
    />

<button onClick={addTask}> Add</button>

    <ul>
      {tasks.map((item) => (
        <li key={item.id} style={{ 
          textDecoration: item.complete ? "line-through": "none", 
          opacity: item.complete ? 0.5 : 1,

        }}>
<input type="checkbox" checked={item.complete} onChange={()=> {toggleTask(item.id)}}/>
          {item.text}
        
        <button onClick={()=> deleteTask(item.id)}> 
          Delete
        </button>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default App