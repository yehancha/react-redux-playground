import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({
  active,
  to,
  children
}) => {
  if (active) {
    return <span>{children}</span>
  } else {
    return (
      <RouterLink to={to}>
        {children}
      </RouterLink>
    );
  }
}

export default Link;
