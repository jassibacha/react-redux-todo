import { combineReducers } from 'redux';
import todosReducer from './todosReducer';

const rootReducer = combineReducers({
    todos: todosReducer,
    // More reducers can go here
});

export default rootReducer;
