import { message } from "antd";
import { createContext } from "react";

export const MyAppContext = createContext("");

export const MyAppContextProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQzZmQyNzA0OTVmY2QyMjdlNGEzYjAiLCJlbWFpbCI6InNhbnRvc2guZGhha2FsMDdAZ21haWwuY29tIiwiaWF0IjoxNjkxNjI1MzkzLCJleHAiOjE2OTE2Mjg5OTN9.tlRRc1MfbrHqOpRlc85h1aKkb0iJHfEvV1xIo-N1ZwQ";
  const loggedInUser = {
    _id: "64d3fd270495fcd227e4a3b0",
    firstName: "Santosh",
    lastName: "Dhakal",
    email: "santosh.dhakal07@gmail.com",
    password: "$2a$12$KsBDPbpV.DD1S8i2xw4ZUu0lEdv3dRx89.DD0IaE3chrMQSSOAxka",
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
        accountBalance: 18000,
        _id: "64d3fd270495fcd227e4a3b1",
      },
      {
        accountNumber: 2,
        accountType: 0,
        status: 0,
        accountBalance: 100000.43,
        _id: "64d3fd270495fcd227e4a3b2",
      },
    ],
    cards: [
      {
        cardType: 0,
        cardNumber: "1111222233334444",
        expiryDate: "2025-02-01T05:00:00.000Z",
        securityCode:
          "$2a$12$t14Zv.W06ZRQsblEWtDwHuDSbakx0GCZcqWzlWzyGi6b5mU7D/g7G",
        status: 0,
        _id: "64d3fd270495fcd227e4a3b3",
      },
      {
        cardType: 1,
        cardNumber: "0000111122223333",
        expiryDate: "2025-02-01T05:00:00.000Z",
        securityCode:
          "$2a$12$t14Zv.W06ZRQsblEWtDwHuDSbakx0GCZcqWzlWzyGi6b5mU7D/g7G",
        maxLimit: 1000,
        accountBalance: 300,
        status: 0,
        _id: "64d3fd270495fcd227e4a3b4",
      },
    ],
    payee: [
      {
        payeeId: "64d3fd270495fcd227e4a3c4",
        displayName: "CRA(Revenue) Tax Amount Owing",
        description: "CRA tax payments",
        accountNumber: 10,
        _id: "64d3fd270495fcd227e4a3da",
      },
      {
        payeeId: "64d3fd270495fcd227e4a3bf",
        displayName: "Humber College",
        description: "Tuition Payment",
        accountNumber: 8,
        _id: "64d3fd270495fcd227e4a3db",
      },
    ],
    __v: 0,
  };

  return (
    <MyAppContext.Provider
      value={{
        user: loggedInUser,
        messageApi: messageApi,
        contextHolder: contextHolder,
        token: token,
      }}
    >
      {children}
    </MyAppContext.Provider>
  );
};
