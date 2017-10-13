import throttle from 'lodash/throttle';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { addTodo, toggleTodo, setVisibilityFilter } from './actions';
import registerServiceWorker from './registerServiceWorker';
import { loadState, saveState } from './localStorage';
import todoApp from './reducers';

const Link = ({
  active,
  onClick,
  children
}) => {
  if (active) {
    return <span>{children}</span>
  } else {
    return (
      <a href={'#/'} onClick={onClick}>
        {children}
      </a>
    );
  }
}

const mapStateToLinkProp = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});
const mapDispatchToLinkProp = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});
const FilterLink = connect(mapStateToLinkProp, mapDispatchToLinkProp)(Link);

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}/>
    ))}
  </ul>
);
const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});
const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
// // === Implementation #1 ===
// AddTodo = connect(
//   state => {
//     return {} // AddTodo needs nothing from store state
//   },
//   dispatch => {
//     return {
//       dispatch // AddTodo needs dispatch as it is, rather than callbacks
//     }
//   }
// )(AddTodo); // Presentaional component is the same as the container component
// // === Implementation #2 ===
// AddTodo = connect(
//   null, // no need to even subscribe to the store
//   dispatch => {
//     return {
//       dispatch
//     }
//   }
// )(AddTodo);
// // === Implementation #3 ===
// AddTodo = connect(
//   null, // no need to even subscribe to the store
//   null // just inject the dispatch as a prop
// )(AddTodo);
// // === Implementation #4 ===
AddTodo = connect()(AddTodo); // does all above

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
    {' '}
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
  </p>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    default:

  }
};

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

const persistedState = loadState();
const store = createStore(todoApp, persistedState);
store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  });
}, 1000));

ReactDOM.render(
  <Provider store={store} >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
