import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import { MyAppContextProvider } from "./provider/MyAppProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "./routes/RootPage";
import AccountSummary from "./routes/AccountSummary";
import SplitBill from "./routes/SplitBill";
import TransferBetweenAccounts from "./routes/TransferBetweenAccounts";
import PayBill from "./routes/PayBill";
import InteracTransfer from "./routes/InteracTransfer";
import Settings from "./routes/Settings";
import AddPayee from "./routes/AddPayee";
import UpcomingPayments from "./routes/UpcomingPayments";
import SplitHistory from "./routes/SplitHistory";
import RequestedSplit from "./routes/RequestedSplit";
import Auth from "./routes/Auth";
import HomePage from "./scene/home-page";

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
              <Route path="/move-money/add-payee" element={<AddPayee />} />
              <Route
                path="/move-money/upcoming-payments"
                element={<UpcomingPayments />}
              />
              <Route
                path="/move-money-interac-transfer"
                element={<InteracTransfer />}
              />
              <Route path="/move-money/split-bill" element={<SplitBill />} />
              <Route
                path="/move-money/split-request-history"
                element={<SplitHistory />}
              />
              <Route
                path="move-money/requested-split"
                element={<RequestedSplit />}
              />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </MyAppContextProvider>
    </ConfigProvider>
  </React.StrictMode>
);
