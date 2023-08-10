import "./styles.css";

const UpcomingPaymentRow = ({ payeeName, date, amount }) => {
  return (
    <div className="upcoming-row-container">
      <div>
        <p>{payeeName}</p>
        <p>{date}</p>
      </div>
      <p>{amount}</p>
    </div>
  );
};

export default UpcomingPaymentRow;
