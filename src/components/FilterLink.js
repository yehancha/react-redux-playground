import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from './Link';

class FilterLink extends Component {
  render() {
    const { filter, children } = this.props;
    const location = filter === 'all' ? '' : filter;
    const active = ('/' + location) === this.context.router.route.location.pathname;

    return (
      <Link to={location} active={active}>
        {children}
      </Link>
    );
  }
}

FilterLink.contextTypes = {
  router: PropTypes.object.isRequired
}

export default FilterLink;
