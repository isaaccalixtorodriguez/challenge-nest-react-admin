import { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthenticationContext } from './context/AuthenticationContext';

interface PrivateRouteProps {
  element: JSX.Element;
  roles?: string[];
}

export function PrivateRoute({ element, roles, ...rest }: PrivateRouteProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  if (!authenticatedUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(authenticatedUser.role)) {
    return <Navigate to="/" />;
  }

  return element;
}

export function AuthRoute({ element, ...rest }) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  if (authenticatedUser) {
    return <Navigate to="/" />;
  }

  return element;
}
