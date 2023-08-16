import { Button } from "antd";
import "./styles.css";

const RequestedSplitRow = ({
  name,
  amount,
  performTransaction,
  transactionId,
}) => {
  return (
    <div className="requested-split-row">
      <div>
        <p>Payment to: {name}</p>
        <p>Amount: {amount}</p>
      </div>
      <Button type="primary" onClick={() => performTransaction(transactionId)}>
        Pay
      </Button>
    </div>
  );
};

export default RequestedSplitRow;
