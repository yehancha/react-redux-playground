import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import FetchError from './FetchError';
import TodoList from './TodoList';

class VisibleTodoList extends Component {
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then(() => {
      // do something if need
    });
  }
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    this.props.filter !== prevProps.filter && this.fetchData();
  }

  render() {
    const { toggleTodo, todos, errorMessage, isFetching } = this.props;
    const { length } = todos;

    if (isFetching && !length) {
      return <p>Loading...</p>;
    } else if (errorMessage && !length) {
      return <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
    }

    return <TodoList onTodoClick={toggleTodo} todos={todos}/>
  }
}

const mapStateToTodoListProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter
  }
};

VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
