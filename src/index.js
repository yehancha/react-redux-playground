import React from 'react';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      } else {
        return {
          ...state,
          completed: !state.completed
        };
      }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(state, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const combineReducersFromScratch = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  };
};

const todoApp = combineReducersFromScratch({
  todos,
  visibilityFilter
});

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      test: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      test: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      test: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      test: 'Go shopping',
      completed: true
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log('Tests passed!');

const store = createStore(todoApp);

const logState = () => {
  console.log('Current state:');
  console.log(store.getState());
  console.log('-------------');
};

const logAndDispatch = action => {
  console.log('Dispatching ' + action.type);
  store.dispatch(action);
};

logState();
logAndDispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});
logState();
logAndDispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go shopping'
});
logState();
logAndDispatch({
  type: 'TOGGLE_TODO',
  id: 0
});
logState();
logAndDispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
logState();

const render = () => {
  ReactDOM.render(
    <div>Hello, Redux!</div>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

registerServiceWorker();
