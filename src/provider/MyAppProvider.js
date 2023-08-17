import { message } from "antd";
import { createContext, useEffect, useState } from "react";
import { getUserAndTokenFromStorage } from "../utils/utils";

export const MyAppContext = createContext("");

export const MyAppContextProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MyAppContext.Provider
      value={{
        messageApi: messageApi,
        contextHolder: contextHolder,
      }}
    >
      {children}
    </MyAppContext.Provider>
  );
};
