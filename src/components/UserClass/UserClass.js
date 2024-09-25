import './UserClass.css';

import React from 'react';

export class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      userInfo: {
        name: 'Brijesh Kumar Singh',
        location: 'Varanasi',
        email: '',
        avatar_url: '',
      },
    };

    console.log(`${this.props.name} UserClass constructor`);
  }

  async componentDidMount() {
    console.log(`${this.props.name} UserClass componentDidMount`);

    const data = await fetch('https://api.github.com/users/brij1728');
    const jsonData = await data.json();
    console.log(jsonData);

    this.setState({
      userInfo: jsonData,
    });

    this.time = setInterval(() => {
      console.log('Interval');
    }, 1000);
  }

  componentDidUpdate() {
    console.log(`${this.props.name} UserClass componentDidUpdate`);
  }

  componentWillUnmount() {
    console.log(`${this.props.name} UserClass componentWillUnmount`);

    clearInterval(this.time);
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    const { count } = this.state;

    console.log('UserClass render');

    return (
      <div className="user-card">
        <div className="counter">
          <button onClick={() => this.setState({ count: count - 1 })}>-</button>
          <p>{count}</p>
          <button onClick={() => this.setState({ count: count + 1 })}>+</button>
        </div>
        <img src={avatar_url} alt="avatar" />
        <h1>Name: {name} (class)</h1>
        <h3>Location: {location}</h3>
        <h4>Email Id: bk10895@gmail.com</h4>
      </div>
    );
  }
}
