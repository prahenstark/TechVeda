import React, { createContext, useState } from "react";

export const DataContext = createContext();

// This context provider is passed to any component requiring the context
export const DataProvider = ({ children }) => {
  const [User, setUser] = useState();
  const [App, setApp] = useState({
    CreateQuizDialogOpened: false,
  });

  return (
    <DataContext.Provider
      value={{
        User,
        App,
        setUser,
        setApp
      }}
    >
      {children}
    </DataContext.Provider>
  );
};