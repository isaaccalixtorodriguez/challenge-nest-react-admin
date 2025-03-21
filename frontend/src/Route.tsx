import { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthenticationContext } from './context/AuthenticationContext';

interface PrivateRouteProps {
  element: JSX.Element; // Cambié `component` a `element`
  roles?: string[];
}

export function PrivateRoute({ element, roles, ...rest }: PrivateRouteProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  // Comprobamos si el usuario está autenticado
  if (!authenticatedUser) {
    return <Navigate to="/login" />; // Redirige si no está autenticado
  }

  // Si se especifican roles, comprobamos si el usuario tiene el rol correcto
  if (roles && !roles.includes(authenticatedUser.role)) {
    return <Navigate to="/" />; // Redirige si no tiene el rol adecuado
  }

  return element; // Si pasa las comprobaciones, renderiza el componente
}

export function AuthRoute({ element, ...rest }) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  // Si el usuario está autenticado, lo redirigimos a la página principal
  if (authenticatedUser) {
    return <Navigate to="/" />;
  }

  return element;
}
