import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { v4 as uuid } from 'uuid';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const renderTodos = () => {
        return (
            <div className="mt-3">
                {todos.map((todo) => (
                    <Todo
                        task={todo.task}
                        id={todo.id}
                        key={todo.id}
                        deleteTodo={() => deleteTodo(todo.id)}
                    />
                ))}
            </div>
        );
    };

    const deleteTodo = (todoId) => {
        // Run setTodos again
        setTodos((todos) =>
            // Filter the todos array from state
            todos.filter((todo) => {
                // If the ID matches, remove it!
                return todo.id !== todoId;
            })
        );
    };

    /** Add new todo to list. */
    const addTodo = (todo) => {
        let newTodo = { ...todo, id: uuid() };
        setTodos((todos) => [...todos, newTodo]);
    };

    return (
        <div className="Todos">
            <TodoForm addTodo={addTodo} />
            {renderTodos()}
        </div>
    );
};

export default TodoList;
