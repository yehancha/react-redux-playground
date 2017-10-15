import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos
});

export default todoApp;

// === Selectors ===

export const getVisibleTodos = (state, filter) => // state matches the state passed to the reducer
  fromTodos.getVisibleTodos(state.todos, filter);
