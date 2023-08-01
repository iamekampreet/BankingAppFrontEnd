import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "./routes/RootPage";
import AccountSummary from "./routes/AccountSummary";
import SplitBill from "./routes/SplitBill";
import TransferBetweenAccounts from "./routes/TransferBetweenAccounts";
import { MyAppContextProvider } from "./provider/MyAppProvider";
import PayBill from "./routes/PayBill";
import InteracTransfer from "./routes/InteracTransfer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: `#006ac2`,
        },
      }}
    >
      <MyAppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootPage />}>
              <Route index element={<AccountSummary />} />
              <Route
                path="/move-money/transfer-between-account"
                element={<TransferBetweenAccounts />}
              />
              <Route path="/move-money/pay-bill" element={<PayBill />} />
              <Route
                path="/move-money-interac-transfer"
                element={<InteracTransfer />}
              />
              <Route path="/move-money/split-bill" element={<SplitBill />} />
              <Route path="/settings" element={<SplitBill />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MyAppContextProvider>
    </ConfigProvider>
  </React.StrictMode>
);
