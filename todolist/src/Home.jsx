import React, { useState, useEffect } from 'react';
import Create from './Create.jsx';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);


  const fetchTodos = () => {
    axios.get("http://localhost:3001/get")
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (id) => {
  axios.put("http://localhost:3001/update/" + id)
    .then(res => {
      location.reload(); 
    })
    .catch(err => console.log(err));
}

  const handleDelete = (id) => {
  axios.delete("http://localhost:3001/delete/" + id)
    .then(res => {
      location.reload();
    })
    .catch(err => console.log(err));
}


  return (
    <div className="task">
      <h2>TaskFlow</h2>
      {/* Pass fetchTodos as refresh prop */}
      <div className="todotask">
      <Create refresh={fetchTodos} />
      </div>
      
      {
        todos.length === 0
          ?<div> <h2>No Todos</h2></div>
          : todos.map(todo => (
            <div className='todolist'>
              <div className="checkbox" onClick={()=>handleEdit(todo._id)}>
                {todo.done ?<BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                :<BsCircleFill className='icon'/> }
                
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div className="delete">
              <span><BsFillTrashFill className='icon' 
             onClick={() => handleDelete(todo._id)}/>
              </span>
            </div>
            </div>
            ))
      }
      </div>
  );
}

export default Home;
