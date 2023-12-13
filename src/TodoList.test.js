import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it('renders without crashing', function () {
    render(<TodoList />);
});

it('matches snapshot', function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('can add a new todo', function () {
    const { getByPlaceholderText, queryByText } = render(<TodoList />);

    // check there's no Delete button
    expect(queryByText('X')).not.toBeInTheDocument();

    const taskInput = getByPlaceholderText('Enter a new task');
    const submitBtn = queryByText('Add');

    // fill out the form
    fireEvent.change(taskInput, { target: { value: 'A Task' } });
    fireEvent.click(submitBtn);

    // todo exists
    const deleteBtn = queryByText('X');
    expect(deleteBtn).toBeInTheDocument();
});

it('can delete a todo', function () {
    const { getByPlaceholderText, getByText, queryByText } = render(
        <TodoList />
    );

    const taskInput = getByPlaceholderText('Enter a new task');
    const submitBtn = getByText('Add');

    // fill out the form
    fireEvent.change(taskInput, { target: { value: 'A Task' } });
    fireEvent.click(submitBtn);

    // todo exists
    const deleteBtn = getByText('X');
    expect(deleteBtn).toBeInTheDocument();

    // delete the todo
    fireEvent.click(deleteBtn);

    // todo is gone!
    expect(queryByText('X')).not.toBeInTheDocument();
});
