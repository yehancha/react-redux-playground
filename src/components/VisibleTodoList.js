import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

class VisibleTodoList extends Component {
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    this.props.filter !== prevProps.filter && this.fetchData();
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList onTodoClick={toggleTodo} {...rest}/>
  }
}

const mapStateToTodoListProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
};

VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
