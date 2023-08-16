import { Button } from "antd";
import "./styles.css";

const UpcomingPaymentRow = ({
  payeeName,
  date,
  amount,
  scheduledPaymentId,
  setSelectedPayment,
  setIsModalOpen,
}) => {
  return (
    <div className="upcoming-row-container">
      <div>
        <p>{payeeName}</p>
        <p>{date}</p>
      </div>
      <div>
        <p>{amount}</p>
        <Button
          type="primary"
          onClick={() => {
            setSelectedPayment({
              scheduledPaymentId: scheduledPaymentId,
              payeeName: payeeName,
            });
            setIsModalOpen(true);
          }}
        >
          Stop Payment
        </Button>
      </div>
    </div>
  );
};

export default UpcomingPaymentRow;
