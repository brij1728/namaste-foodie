import {createContext} from 'react';
import { useState } from 'react';

export const UserContext = createContext({
	loggedInUser: "Default User",
});




export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState('Default User');

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
