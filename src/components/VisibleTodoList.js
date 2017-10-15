import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

const mapStateToTodoListProps = (state, ownProps) => ({
  todos: getVisibleTodos(state, ownProps.match.params.filter || 'all')
});

const VisibleTodoList = withRouter(
  connect(
    mapStateToTodoListProps,
    { onTodoClick: toggleTodo }
  )(TodoList)
);

export default VisibleTodoList;
