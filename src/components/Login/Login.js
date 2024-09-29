import { useContext, useState } from 'react';

import { UserContext } from '../../utils';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      setLoggedInUser(username); // Update the context value
      setIsLoggedIn(true);
      setUsername(''); // Clear the input field
      // Navigate to the home page after successful login
      navigate('/');
    } else {
      alert('Please enter a valid username');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {isLoggedIn && <p>Welcome, {username}!</p>}{' '}
      {/* Display welcome message */}
    </div>
  );
};
