import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it('renders without crashing', function () {
    render(<TodoList />);
});

it('matches snapshot', function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('can add a new todo', function () {
    render(<TodoList />);

    // check there's no Delete button
    expect(screen.queryByText('X')).not.toBeInTheDocument();

    const taskInput = screen.getByPlaceholderText('Enter a new task');
    const submitBtn = screen.getByText('Add');

    // fill out the form
    fireEvent.change(taskInput, { target: { value: 'A Task' } });
    fireEvent.click(submitBtn);

    // todo exists
    const deleteBtn = screen.queryByText('X');
    expect(deleteBtn).toBeInTheDocument();
});

it('can delete a todo', function () {
    render(<TodoList />);

    const taskInput = screen.getByPlaceholderText('Enter a new task');
    const submitBtn = screen.getByText('Add');

    // fill out the form
    fireEvent.change(taskInput, { target: { value: 'A Task' } });
    fireEvent.click(submitBtn);

    // todo exists
    const deleteBtn = screen.getByText('X');
    expect(deleteBtn).toBeInTheDocument();

    // delete the todo
    fireEvent.click(deleteBtn);

    // todo is gone!
    expect(screen.queryByText('X')).not.toBeInTheDocument();
});
