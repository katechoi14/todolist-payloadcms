import React, {useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
    id: string;
    task: string;
    userName: string;
    date: Date | null;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        axios.get<Todo[]>('/api/todos')
        .then(response => setTodos(response.data))
        .catch(error => console.error('Cannot fetch todos:', error));
    }, []);

    const addTodo = () => {
        axios.post<Todo>('/api/todos', { title: newTodo })
        .then(response => setTodos([...todos, response.data]))
        .catch(error => console.error('Cannot add todo:', error));
        setNewTodo('');
    };
    
    const deleteTodo = (id: string) => {
        axios.delete(`/api/todos/${id}`)
        .then(() => setTodos(todos.filter(todo => todo.id !== id)))
        .catch(error => console.error('Cannot delete todo:', error));
    };

    return (
        <div>
          <h1>Todo List</h1>
          <input 
            type="text" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
          />
          <button onClick={addTodo}>Add Todo</button>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.task}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default TodoList;
    
    