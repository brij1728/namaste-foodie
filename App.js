import React from 'react';
import ReactDOM from 'react-dom/client';

// React Element
const heading = (
  <h1 id="heading" className="head">
    Namaste React using JSX
  </h1>
);

console.log(jsxHeading);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(heading);
