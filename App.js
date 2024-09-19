import React from 'react';
import ReactDOM from 'react-dom/client';

// React.createElement => Object => HTMLElement(rendered on the DOM)
const heading = React.createElement('h1', {id: "heading"}, 'Hello World!');
console.log(heading);

// JSX => JavaScript XML , syntactic sugar for React.createElement
// JSX (Transpiled before it reaches the JS Engine) - Done by Babel(javascript complier ) inside Parcel
// JSX => React.createElement => ReactElement - JS Object => HTMLElement(rendered on the DOM)

const jsxHeading = <h1 id="heading" className='head'>Namaste React using JSX</h1>;
console.log(jsxHeading);




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(jsxHeading);