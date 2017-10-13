import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(t => !t.completed);
    case 'completed':
      return todos.filter(t => t.completed);
    default:

  }
};

const mapStateToTodoListProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.match.params.filter || 'all')
});

const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});

const VisibleTodoList = withRouter(
  connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList)
);

export default VisibleTodoList;
