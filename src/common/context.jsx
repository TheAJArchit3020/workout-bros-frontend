// context/UsersContext.tsx
import React, { createContext, useState, useContext } from "react";

const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [usersArray, setUsersArray] = useState(null);

  return (
    <UsersContext.Provider value={{ usersArray, setUsersArray }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
