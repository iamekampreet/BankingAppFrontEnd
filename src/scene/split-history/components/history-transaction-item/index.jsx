import "./styles.css";

const HistoryTransactionItem = ({ name, amount, status }) => {
  return (
    <div className="history-transaction-item">
      <div>
        <p>{name}</p>
        <p>{amount}</p>
      </div>
      <p className={status === 0 ? `pending` : `complete`}>
        {status === 0 ? `Pending` : `Complete`}
      </p>
    </div>
  );
};

export default HistoryTransactionItem;
