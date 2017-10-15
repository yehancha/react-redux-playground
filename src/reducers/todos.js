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

export default todos;

// === Selectors ===

export const getVisibleTodos = (state, filter) => { // state matches the state passed to the reducer
  switch (filter) {
    case 'all':
      return state;
    case 'active':
      return state.filter(t => !t.completed);
    case 'completed':
      return state.filter(t => t.completed);
    default:

  }
};
