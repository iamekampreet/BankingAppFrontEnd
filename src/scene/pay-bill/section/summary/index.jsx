import { useNavigate } from "react-router-dom";
import NormalInfoSummary from "../../../split-bill/component/normal-info-summary";
import { useContext } from "react";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import { Button } from "antd";
import { getFrequencyLabel } from "../../../../utils/utils";

import "./styles.css";

const PayBillSummarySection = ({ payBillInfo, setCurrentSection }) => {
  const navigate = useNavigate();
  const {
    messageApi,
    token,
    user: { _id },
  } = useContext(MyAppContext);

  // console.log(JSON.stringify(payBillInfo));
  // const payBillInfo = {
  //   from: '{"displayStr":"SAVING - (#2)","accountNumber":2}',
  //   to: '{"payeeId":"64d2f77d0971536e27aae613","accountNumber":10,"displayName":"CRA(Revenue) Tax Amount Owing"}',
  //   amount: "10000",
  //   date: "2023-08-09T19:56:37.412Z",
  //   frequency: 0,
  // };

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
    console.log(process.env.REACT_APP_PAY_BILL, _id);
    try {
      const response = await fetch(`${process.env.REACT_APP_PAY_BILL}`, {
        method: `POST`,
        body: JSON.stringify(payBillBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const message = await response.json();
      messageApi.info(message.message);
      if (response.ok) {
        navigate("/");
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
