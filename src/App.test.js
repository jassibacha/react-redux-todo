import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('App', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            todos: [],
        });
    });

    test('renders without crashing', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    test('renders To-Do List header', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const headerElement = screen.getByText(/To-Do List/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('submits form in TodoForm and adds new todo', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        // Simulate filling out the form
        fireEvent.change(screen.getByPlaceholderText('Enter a new task'), {
            target: { value: 'New Task' },
        });

        // Simulate form submission
        fireEvent.click(screen.getByText('Add'));

        // Check if the 'ADD_TODO' action was dispatched
        const actions = store.getActions();
        expect(actions[0].type).toBe('ADD_TODO');
        expect(actions[0].payload).toEqual({
            task: 'New Task',
            id: expect.any(String), // Since ID is generated dynamically
        });
    });

    // Additional tests...
});
