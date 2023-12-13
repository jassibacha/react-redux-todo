import React from 'react';
import './Todo.css';

const Todo = ({ task, id, deleteTodo }) => {
    return (
        <div
            className="Todo d-flex justify-content-between align-items-center border p-3 mb-2"
            key={id}
        >
            <div className="Todo-task">{task}</div>
            <button className="btn btn-danger btn-sm" onClick={deleteTodo}>
                X
            </button>
        </div>
    );
};

export default Todo;
