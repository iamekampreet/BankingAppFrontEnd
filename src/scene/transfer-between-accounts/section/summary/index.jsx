import { useNavigate } from "react-router-dom";
import NormalInfoSummary from "../../../split-bill/component/normal-info-summary";
import { useContext } from "react";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import { Button } from "antd";
import { getFrequencyLabel } from "../../../../utils/utils";

import "./styles.css";

const TransferBetweenAccountsSummarySection = ({
  transferBetweenAccountsInfo,
  setCurrentSection,
}) => {
  const navigate = useNavigate();
  const {
    messageApi,
    token,
    user: { _id },
  } = useContext(MyAppContext);

  const from = JSON.parse(transferBetweenAccountsInfo.from);
  const to = JSON.parse(transferBetweenAccountsInfo.to);
  const date = new Date(transferBetweenAccountsInfo.date);

  // console.log("HERE TO ACCOUNT");
  // console.log(transferBetweenAccountsInfo.to);

  const transferBetweenAccountsBody = {
    from: from.accountNumber,
    to: to.accountNumber,
    amount: transferBetweenAccountsInfo.amount,
    date: date.getTime(),
    frequency: transferBetweenAccountsInfo.frequency,
  };

  const sendSplitHandler = async () => {
    console.log(process.env.REACT_APP_TRANSFER_BETWEEN_ACCOUNTS, _id);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_TRANSFER_BETWEEN_ACCOUNTS}/${_id}`,
        {
          method: `POST`,
          body: JSON.stringify(transferBetweenAccountsBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const message = await response.json();
      messageApi.info(message.message);
      if (response.status === 200) {
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
      <NormalInfoSummary title="To" value={to.displayStr} />
      <NormalInfoSummary
        title="Amount"
        value={transferBetweenAccountsInfo.amount}
      />
      <NormalInfoSummary
        title="Date"
        value={transferBetweenAccountsInfo.date.format("YYYY-MM-DD")}
      />
      <NormalInfoSummary
        title="Frequency"
        value={getFrequencyLabel(transferBetweenAccountsInfo.frequency)}
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

export default TransferBetweenAccountsSummarySection;
