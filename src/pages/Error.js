import React from 'react';
import { useRouteError } from 'react-router-dom';

export const Error = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!!!</h1>
      <p>Page not found</p>
      {error && (
        <p>
          {error.status}: {error.statusText || error.message}
        </p>
      )}
    </div>
  );
};
