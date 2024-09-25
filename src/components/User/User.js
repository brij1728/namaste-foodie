import './User.css';

import React, { useEffect, useState } from 'react';

export const User = (props) => {
  const [count, setCount] = useState(0);
  const [count2] = useState(1);

  handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log('User useEffect');

    return () => {
      console.log('User return');
    };
  }, []);

  return (
    <div className="user-card">
      <button onClick={handleClick}>Count = {count}</button>
      <h1>Count = {count2}</h1>
      <h1>Name: {props.name} (function)</h1>
      <h3>Location: Varanasi</h3>
      <h4>Email Id: bk10895@gmail.com</h4>
    </div>
  );
};
