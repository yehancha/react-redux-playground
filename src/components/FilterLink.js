import React from 'react';
import { withRouter } from 'react-router-dom';
import Link from './Link';

const FilterLink = ({ filter, children, match }) => (
  <Link
      active={filter === (match.params.filter || 'all')}
      to={filter === 'all' ? '' : filter}>
    {children}
  </Link>
);

export default withRouter(FilterLink);
