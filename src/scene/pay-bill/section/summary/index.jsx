import { useNavigate } from "react-router-dom";
import NormalInfoSummary from "../../../split-bill/component/normal-info-summary";
import { useContext } from "react";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import { Button } from "antd";
import {
  clearUserAndTokenFromStorage,
  getFrequencyLabel,
  getUserAndTokenFromStorage,
  updateUserInStorage,
} from "../../../../utils/utils";

import "./styles.css";

const PayBillSummarySection = ({ payBillInfo, setCurrentSection }) => {
  const navigate = useNavigate();
  const { messageApi } = useContext(MyAppContext);
  const { token, user } = getUserAndTokenFromStorage();

  const from = JSON.parse(payBillInfo.from);
  const to = JSON.parse(payBillInfo.to);
  const date = new Date(payBillInfo.date);

  console.log(typeof payBillInfo.date);

  const payBillBody = {
    from: from.accountNumber,
    to: {
      payeeId: to.payeeId,
      accountNumber: to.accountNumber,
      displayName: to.displayName,
    },
    amount: payBillInfo.amount,
    date: date.getTime(),
    frequency: payBillInfo.frequency,
  };

  const sendSplitHandler = async () => {
    console.log(process.env.REACT_APP_PAY_BILL);
    try {
      const response = await fetch(`${process.env.REACT_APP_PAY_BILL}`, {
        method: `POST`,
        body: JSON.stringify(payBillBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonResponse = await response.json();
      if (response.ok) {
        updateUserInStorage(jsonResponse.user);
        console.log(jsonResponse.user);
        navigate("/move-money/upcoming-payments");
      }
      messageApi.info(jsonResponse.message);
      if (response.status === 401) {
        clearUserAndTokenFromStorage();
        navigate("/auth");
      }
    } catch (ex) {
      messageApi.info(ex.message);
    }
  };

  const onEditClickHandler = async () => {
    setCurrentSection(`input`);
  };

  return (
    <div className="summary-container">
      <h2>Payment Summary</h2>
      <NormalInfoSummary title="From" value={from.displayStr} />
      <NormalInfoSummary title="To" value={to.displayName} />
      <NormalInfoSummary title="Amount" value={payBillInfo.amount} />
      <NormalInfoSummary
        title="Date"
        value={payBillInfo.date.format("YYYY-MM-DD")}
      />
      <NormalInfoSummary
        title="Frequency"
        value={getFrequencyLabel(payBillInfo.frequency)}
      />
      <div className="split-summary-button-container">
        <Button type="primary" size="large" onClick={sendSplitHandler}>
          Send It
        </Button>
        <Button size="large" onClick={onEditClickHandler}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default PayBillSummarySection;
