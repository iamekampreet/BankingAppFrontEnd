import { createContext, useState } from "react";

export const MyAppContext = createContext();

export const MyAppContextProvider = ({ children }) => {
  //TODO add app wide values

  return <MyAppContext.Provider value={{}}>{children}</MyAppContext.Provider>;
};
