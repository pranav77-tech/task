import { useState } from "react";
import './style.css'
function TaskManage(){
    const [tasks, setTasks] = useState([]);

    const [inputValue, stateInputValue] = useState("");

    function addTask(){
        if(inputValue.length === 0){
            return;
        }
        setTasks([
            ...tasks,
        {
          content: inputValue,
          isComplete: false,
          isEditing: false
        }

        ]);
        stateInputValue("");
    }

    function deleteTask(taskIndex){
        tasks.splice(taskIndex, 1)
        setTasks([
              ...tasks
         ])

    }
    function markComplete(taskIndex){
        tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete
        setTasks([
             ...tasks
        ])
    }
    function editTask(taskIndex){
        tasks[taskIndex].isEditing = true;
        setTasks(
            [...tasks]
        )
    }

    function updateValue(taskIndex, value){
        tasks[taskIndex].content = value;
        setTasks(
            [...tasks]
        )
    }
    function saveTask(taskIndex){
        tasks[taskIndex].isEditing = false;
        setTasks(
            [...tasks]
        )
    }
     
    return <div className="task-manager">
        <h1>Task Manager</h1>
        <div className="tasks">
          {
            tasks.sort((a)=>a.isComplete ? 1 : -1).map(
                (task, index)=><div key={index} className="task">
                <input type="Checkbox" checked={task.isComplete} onChange={()=>markComplete(index)} />
                    {
                        task.isEditing ?
                            <input value={task.content}onChange={(event)=>updateValue(index, event.target.value)} className="edit-input" />
                            :
                            <span className="content">
                             {
                               task.isComplete ?
                               <del>{task.content}</del>:
                               task.content
                             }
                            </span>
                    }
                    {
                      task.isEditing ?
                        <button onClick={()=>saveTask(index)} className="save">Save</button>:
                        <button onClick={()=>editTask(index)} className="edit">Edit</button>
                    }
                   <button onClick={()=>deleteTask(index)} className="delete">Delete</button>
                </div>
            )            
          }
        </div>

        <div className="add-task-container">
            <input value={inputValue} onChange={(event)=>stateInputValue(event.target.value)}  placeholder="Enter a task" />
            <button onClick={addTask}>Add task</button>
        </div>
    </div>
}

export default TaskManage;
