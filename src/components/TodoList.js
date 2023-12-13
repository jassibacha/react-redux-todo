import React from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from '../actions/todosActions';

const TodoList = () => {
    const todos = useSelector((state) => state.todos);

    const dispatch = useDispatch();

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
        dispatch(remove(todoId));
    };

    /** Add new todo to list. */
    const addTodo = (todo) => {
        const newTodo = { ...todo, id: uuid() };
        dispatch(add(newTodo));
    };

    return (
        <div className="Todos">
            <TodoForm addTodo={addTodo} />
            {renderTodos()}
        </div>
    );
};

export default TodoList;
