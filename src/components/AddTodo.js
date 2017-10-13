import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

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

export default AddTodo;
