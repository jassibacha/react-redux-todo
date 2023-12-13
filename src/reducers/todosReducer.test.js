import todosReducer from './todosReducer';
import { add, remove } from '../actions/todosActions';

describe('todosReducer', () => {
    it('should return the initial state', () => {
        expect(todosReducer(undefined, {})).toEqual([]);
    });

    it('should handle ADD_TODO', () => {
        const newTodo = { id: '1', task: 'Test Todo' };
        const action = add(newTodo);
        expect(todosReducer([], action)).toEqual([newTodo]);
    });

    it('should handle REMOVE_TODO', () => {
        const initialState = [
            { id: '1', task: 'Test Todo 1' },
            { id: '2', task: 'Test Todo 2' },
        ];
        const action = remove('1');
        expect(todosReducer(initialState, action)).toEqual([
            { id: '2', task: 'Test Todo 2' },
        ]);
    });
});
