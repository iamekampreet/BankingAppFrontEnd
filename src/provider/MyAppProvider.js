import { message } from "antd";
import { createContext, useState } from "react";

export const MyAppContext = createContext("");

export const MyAppContextProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const token_user1 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRiZTEyODg0N2RmZmEzZmU1MDU0MmEiLCJlbWFpbCI6InNhbnRvc2guZGhha2FsMDdAZ21haWwuY29tIiwiaWF0IjoxNjkyMjA5MDQ0LCJleHAiOjE2OTIyMTI2NDR9.opbCUWsqtEjQZw5J2BiZWX19PvqxLn44_VRB8pTHJso";
  const token_user2 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRiZTEyODg0N2RmZmEzZmU1MDU0MzQiLCJlbWFpbCI6ImFsbGEuZ25hdGtpdkBnbWFpbC5jb20iLCJpYXQiOjE2OTIyMDY4MzYsImV4cCI6MTY5MjIxMDQzNn0.WjRfBTh1dSOy0qzZaeLbfb891_B3EHlbA7_B4YAD_os";
  const user1 = {
    _id: "64dbe128847dffa3fe50542a",
    firstName: "Santosh",
    lastName: "Dhakal",
    email: "santosh.dhakal07@gmail.com",
    password: "$2a$12$7non.KKK2CICgRCUs04C9.qJ0L0Gh1aVGSEGHa20etoViqBzmgYKy",
    address: "1234 Bloor St, Mississauga, ON, Canada",
    phone: "+16478365807",
    sinNumber: "123456789",
    accountType: 0,
    displayName: "Santosh Dhakal",
    accounts: [
      {
        accountNumber: 1,
        accountType: 1,
        status: 0,
        accountBalance: 20000,
        _id: "64dbe128847dffa3fe50542b",
      },
      {
        accountNumber: 2,
        accountType: 0,
        status: 0,
        accountBalance: 100000.43,
        _id: "64dbe128847dffa3fe50542c",
      },
    ],
    cards: [
      {
        cardType: 0,
        cardNumber: "1111222233334444",
        expiryDate: "2025-02-01T05:00:00.000Z",
        securityCode:
          "$2a$12$5TfDb1DCOy5axzoBLvieC.hMf8kzp1ZxK8y5r7lvHHsQMrFUDB16W",
        status: 0,
        _id: "64dbe128847dffa3fe50542d",
      },
      {
        cardType: 1,
        cardNumber: "0000111122223333",
        expiryDate: "2025-02-01T05:00:00.000Z",
        securityCode:
          "$2a$12$5TfDb1DCOy5axzoBLvieC.hMf8kzp1ZxK8y5r7lvHHsQMrFUDB16W",
        maxLimit: 1000,
        accountBalance: 300,
        status: 0,
        _id: "64dbe128847dffa3fe50542e",
      },
    ],
    payee: [
      {
        payeeId: "64dbe128847dffa3fe50543e",
        displayName: "CRA(Revenue) Tax Amount Owing",
        description: "CRA tax payments",
        accountNumber: 10,
        _id: "64dbe128847dffa3fe505454",
      },
      {
        payeeId: "64dbe128847dffa3fe505439",
        displayName: "Humber College",
        description: "Tuition Payment",
        accountNumber: 8,
        _id: "64dbe128847dffa3fe505455",
      },
    ],
    __v: 0,
  };
  const user2 = {
    _id: "64dbe128847dffa3fe505434",
    firstName: "Alla-Anastasiia",
    lastName: "Gnatkiv",
    email: "alla.gnatkiv@gmail.com",
    password: "$2a$12$7non.KKK2CICgRCUs04C9.qJ0L0Gh1aVGSEGHa20etoViqBzmgYKy",
    address: "1234 Lakeshore Rd E, Mississauga, ON, Canada",
    phone: "+14372611240",
    sinNumber: "123456789",
    accountType: 0,
    displayName: "Alla-Anastasiia Gnatkiv",
    accounts: [
      {
        accountNumber: 5,
        accountType: 1,
        status: 0,
        accountBalance: 654356.43,
        _id: "64dbe128847dffa3fe505435",
      },
      {
        accountNumber: 6,
        accountType: 0,
        status: 0,
        accountBalance: 345324.23,
        _id: "64dbe128847dffa3fe505436",
      },
    ],
    cards: [
      {
        cardType: 0,
        cardNumber: "2222333344445555",
        expiryDate: "2025-02-01T05:00:00.000Z",
        securityCode:
          "$2a$12$5TfDb1DCOy5axzoBLvieC.hMf8kzp1ZxK8y5r7lvHHsQMrFUDB16W",
        status: 0,
        _id: "64dbe128847dffa3fe505437",
      },
      {
        cardType: 1,
        cardNumber: "3333444455556666",
        expiryDate: "2025-02-01T05:00:00.000Z",
        securityCode:
          "$2a$12$5TfDb1DCOy5axzoBLvieC.hMf8kzp1ZxK8y5r7lvHHsQMrFUDB16W",
        maxLimit: 1000,
        accountBalance: 300,
        status: 0,
        _id: "64dbe128847dffa3fe505438",
      },
    ],
    payee: [],
    __v: 0,
  };

  const [user, setUser] = useState();
  const [token, setToken] = useState(token_user1);

  return (
    <MyAppContext.Provider
      value={{
        user: user,
        messageApi: messageApi,
        contextHolder: contextHolder,
        token: token,
        setToken: setToken,
        updateUser: setUser,
      }}
    >
      {children}
    </MyAppContext.Provider>
  );
};
