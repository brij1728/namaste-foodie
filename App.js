import React from 'react';
import ReactDOM from 'react-dom/client';

// React Element


const elem = <span>React Element</span>;

const title = (
  <h1 id="title" className="title">
    {elem}
    Namaste React
    
  </h1>
)

// React functional component
const Title = () => (
  <h1 id="title" className="title">
    Namaste React using JSX
  </h1>
);

const number = 10;

const HeadingComponent = () => (
  <div id="container">
    {Title()}
    <Title />
    <Title></Title>
    {title}
    <h2>{number}</h2>
    <h1 id="heading" className="head">
      Namaste React using Functional Component
    </h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<HeadingComponent />);
