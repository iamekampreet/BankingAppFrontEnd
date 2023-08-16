import "./styles.css";

const DetailRow = ({ openModal, ...payee }) => {
  return (
    <div className="detail-row" onClick={() => openModal(payee)}>
      <div>
        <p>{payee.displayName}</p>
        <p>{`Account #${payee.accountNumber}`}</p>
      </div>
      <p></p>
    </div>
  );
};

export default DetailRow;
