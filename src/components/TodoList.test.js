import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { add, remove } from '../actions/todosActions';

const mockStore = configureStore([]);

describe('TodoList', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            todos: [],
        });
    });

    it('renders without crashing', function () {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
    });

    it('matches snapshot', function () {
        const { asFragment } = render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('can add a new todo', function () {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );

        // check there's no Delete button
        expect(screen.queryByText('X')).not.toBeInTheDocument();

        const taskInput = screen.getByPlaceholderText('Enter a new task');
        const submitBtn = screen.getByText('Add');

        // fill out the form
        fireEvent.change(taskInput, { target: { value: 'A Task' } });
        fireEvent.click(submitBtn);

        // Assert that an 'ADD_TODO' action was dispatched
        const actions = store.getActions();
        expect(actions[0].type).toBe('ADD_TODO');
        expect(actions[0].payload).toHaveProperty('task', 'A Task');
    });

    it('can delete a todo', function () {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>
        );

        // Directly dispatch add action
        const todoToAdd = { id: '123', task: 'A Task' };
        store.dispatch(add(todoToAdd));

        // Assert that an 'ADD_TODO' action was dispatched
        let actions = store.getActions();
        expect(actions[0].type).toBe('ADD_TODO');
        expect(actions[0].payload).toEqual(todoToAdd);

        // Now test deleting the todo
        store.dispatch(remove(todoToAdd.id));

        // Refresh actions array after dispatching delete
        actions = store.getActions();

        // Assert that a 'REMOVE_TODO' action was dispatched
        expect(actions[1].type).toBe('REMOVE_TODO');
        expect(actions[1].payload).toBe(todoToAdd.id);
    });
});
