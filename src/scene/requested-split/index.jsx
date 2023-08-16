import { useContext, useEffect, useState } from "react";
import "./styles.css";
import RequestedSplitRow from "./components/requested-split-row";
import { MyAppContext } from "../../provider/MyAppProvider";

const RequestedSplitScene = () => {
  const [requestedSplits, setRequestSplits] = useState([]);
  const { token, messageApi } = useContext(MyAppContext);

  const fetchRequestedSplit = async () => {
    try {
      console.log(process.env.REACT_APP_SPLIT_BILL_REQUESTED_SPLIT, token);
      const response = await fetch(
        `${process.env.REACT_APP_SPLIT_BILL_REQUESTED_SPLIT}`,
        {
          method: `GET`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const jsonResponse = await response.json();
      if (response.ok) {
        setRequestSplits(jsonResponse);
      } else if (response.status === 401) {
        messageApi.info(jsonResponse.message);
      }
    } catch (ex) {
      console.log("=====");
      console.log(ex);
      messageApi.info(ex.message);
    }
  };

  useEffect(() => {
    fetchRequestedSplit();
  }, []);

  const performTransaction = async (transactionId) => {
    try {
      console.log(process.env.REACT_APP_SPLIT_BILL_COMPLETE_TRANSACTION, token);
      const response = await fetch(
        `${process.env.REACT_APP_SPLIT_BILL_COMPLETE_TRANSACTION}`,
        {
          method: `POST`,
          body: JSON.stringify({
            transactionId: transactionId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const statusMessage = await response.json();
      messageApi.info(statusMessage.message);
      if (response.ok) {
        await fetchRequestedSplit();
      }
    } catch (ex) {
      console.log("=====");
      console.log(ex);
      messageApi.info(ex.message);
    }
  };

  return (
    <div className="requested-split-container">
      {requestedSplits.length === 0 ? (
        <h2>No requested payments!</h2>
      ) : (
        <span />
      )}
      {requestedSplits.map((requestedSplit) => {
        return (
          <RequestedSplitRow
            key={requestedSplit.transactionId}
            name={requestedSplit.toUserName}
            amount={requestedSplit.amount}
            transactionId={requestedSplit.transactionId}
            performTransaction={performTransaction}
          />
        );
      })}
    </div>
  );
};

export default RequestedSplitScene;
