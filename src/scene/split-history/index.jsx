import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { MyAppContext } from "../../provider/MyAppProvider";
import HistoryTransactionItem from "./components/history-transaction-item";
import { Collapse } from "antd";
import {
  clearUserAndTokenFromStorage,
  getUserAndTokenFromStorage,
} from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const SplitHistoryScene = () => {
  const [splitHistoryInfo, setSplitHistoryInfo] = useState();
  const { messageApi } = useContext(MyAppContext);
  const { token } = getUserAndTokenFromStorage();
  const navigate = useNavigate();

  const fetchSplitHistory = async () => {
    try {
      console.log(process.env.REACT_APP_SPLIT_BILL_HISTORY, token);
      const response = await fetch(
        `${process.env.REACT_APP_SPLIT_BILL_HISTORY}`,
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
        setSplitHistoryInfo(jsonResponse);
      } else {
        messageApi.info(jsonResponse.message);
      }
      if (response.status === 401) {
        clearUserAndTokenFromStorage();
        navigate("/auth");
      }
    } catch (ex) {
      console.log("=====");
      console.log(ex);
      messageApi.info(ex.message);
    }
  };

  useEffect(() => {
    fetchSplitHistory();
  }, []);

  const splitHistoryItems = splitHistoryInfo
    ?.sort((item1, item2) => {
      const item1_date = new Date(item1.requestedDate);
      const item2_date = new Date(item2.requestedDate);
      return item2_date - item1_date;
    })
    ?.map((info) => {
      return {
        key: info.id,
        label: `${info.note ?? `Request`} ${
          info.requestedDate ? info.requestedDate.split("T")[0] : ``
        }`,
        children: info.requestedTransactions.map((requestedTransaction) => {
          return (
            <HistoryTransactionItem
              name={requestedTransaction.requestedUserName}
              amount={requestedTransaction.amount}
              status={requestedTransaction.status}
            />
          );
        }),
        style: {
          marginBottom: 24,
          background: "lightgray",
          border: "none",
        },
      };
    });

  console.log(splitHistoryItems);

  return (
    <div className="split-history-container">
      {splitHistoryItems?.length !== 0 ? (
        <Collapse
          size="large"
          bordered={false}
          items={splitHistoryItems}
          style={{
            background: "white",
          }}
        />
      ) : (
        <h2>No Request History</h2>
      )}
    </div>
  );
};

export default SplitHistoryScene;
