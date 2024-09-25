import './UserClass.css';

import React from 'react';

export class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };

    console.log('UserClass constructor');
  }

  render() {
    const { name, location } = this.props;
    const { count } = this.state;

    return (
      <div className="user-card">
        <div className="counter">
          <button onClick={() => this.setState({ count: count - 1 })}>-</button>
          <p>{count}</p>
          <button onClick={() => this.setState({ count: count + 1 })}>+</button>
        </div>
        <h1>Name: {name} (class)</h1>
        <h3>Location: {location}</h3>
        <h4>Email Id: bk10895@gmail.com</h4>
      </div>
    );
  }
}
