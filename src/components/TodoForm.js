import React, { useState } from 'react';
import './TodoForm.css';

/** Form for creating a new item to add to a list.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const TodoForm = ({ addTodo }) => {
    const INITIAL_STATE = {
        task: '',
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    /** Send {width, height, backgroundColor} to parent
     *    & clear form. */

    const handleSubmit = (evt) => {
        evt.preventDefault();
        addTodo(formData);
        setFormData(INITIAL_STATE);
    };

    /** Update local state w/curr state of input elem */

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    /** render form */

    return (
        <div className="card bg-light mb-3">
            <div className="card-body">
                <form onSubmit={handleSubmit} className="TodoForm row">
                    <div className="col-10">
                        <input
                            type="text"
                            className="form-control"
                            id="task"
                            name="task"
                            placeholder="Enter a new task"
                            value={formData.task}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary w-100">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;
