import  { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'; 

function TodoList() {
    let [todo, setTodo] = useState([{ key: uuidv4(), task: 'Sample task', isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addME = () => {
        if (newTodo.trim()) {
            setTodo([...todo, { key: uuidv4(), task: newTodo, isDone: false }]);
            setNewTodo("");
        }
    };

    let del = (id) => {
        setTodo((pretodo) => pretodo.filter((item) => item.key !== id));
    };

    let update = (id) => {
        setTodo((pretodo) => 
            pretodo.map((item) => 
                id === item.key ? { ...item, task: item.task.toUpperCase() } : item
            )
        );
    };

    let toggleDone = (id) => {
        setTodo((pretodo) => 
            pretodo.map((item) => 
                id === item.key ? { ...item, isDone: !item.isDone } : item
            )
        );
    };

    return (
        <div className="container">
            <h1>Todo List</h1>
            <input 
                type="text" 
                placeholder="Enter item in list" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
            />
            <button onClick={addME}>ADD</button>
            <ul>
                {todo.map((item) => (
                    <li key={item.key}>
                        <span className={item.isDone ? 'completed' : ''}>{item.task}</span>
                        <div>
                            <button onClick={() => del(item.key)} className="del">DEL</button>
                            <button onClick={() => update(item.key)}>UPDATE</button>
                            <button onClick={() => toggleDone(item.key)}>
                                {item.isDone ? '❌' : '✔️'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
