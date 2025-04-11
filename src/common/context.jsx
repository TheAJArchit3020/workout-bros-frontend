// context/UsersContext.tsx
import React, { createContext, useState, useContext } from "react";

const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [usersArray, setUsersArray] = useState(null);
  const [selectType, setSelectType] = useState("explore");

  return (
    <UsersContext.Provider
      value={{ usersArray, setUsersArray, selectType, setSelectType }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
