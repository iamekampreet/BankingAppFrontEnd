import { useContext, useEffect, useState } from "react";
import UpcomingPaymentRow from "./components/upcoming-payment-row";
import "./styles.css";
import { MyAppContext } from "../../provider/MyAppProvider";
import { Button, Modal } from "antd";
import {
  clearUserAndTokenFromStorage,
  getUserAndTokenFromStorage,
} from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const UpcomingPaymentsScene = () => {
  const [upcomingPayments, setUpcomingPayments] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState();
  const { messageApi } = useContext(MyAppContext);
  const { token } = getUserAndTokenFromStorage();
  const navigate = useNavigate();

  const fetchUpcomingPayments = async () => {
    const response = await fetch(`${process.env.REACT_APP_UPCOMING_PAYMENTS}`, {
      method: `GET`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    if (response.ok) {
      setUpcomingPayments(jsonResponse);
    } else {
      messageApi.info(jsonResponse.message);
    }
    if (response.status === 401) {
      clearUserAndTokenFromStorage();
      navigate("/auth");
    }
  };

  const stopScheduledPayment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_PAY_BILL_STOP_PAYMENTS}`,
      {
        method: `POST`,
        body: JSON.stringify({
          scheduledPaymentId: selectedPayment.scheduledPaymentId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonResponse = await response.json();
    messageApi.info(jsonResponse.message);
    setIsModalOpen(false);
    if (response.ok) {
      await fetchUpcomingPayments();
    }
    if (response.status === 401) {
      clearUserAndTokenFromStorage();
      navigate("/auth");
    }
  };

  useEffect(() => {
    fetchUpcomingPayments();
  }, []);

  const handleStopPaymentConfirm = () => {
    stopScheduledPayment();
  };

  return (
    <div className="upcoming-payment-container">
      <h2>Upcoming Payments</h2>
      {upcomingPayments?.map((upcomingPayment) => {
        return (
          <UpcomingPaymentRow
            payeeName={upcomingPayment.to.displayName}
            amount={upcomingPayment.amount}
            date={upcomingPayment.date}
            scheduledPaymentId={upcomingPayment.scheduledPaymentId}
            setSelectedPayment={setSelectedPayment}
            setIsModalOpen={setIsModalOpen}
          />
        );
      })}
      <Modal
        open={isModalOpen}
        title={`Stop payment to ${
          selectedPayment?.payeeName ? selectedPayment.payeeName : ``
        }?`}
        onCancel={(e) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            Go Back
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleStopPaymentConfirm}
          >
            Stop Payment
          </Button>,
        ]}
      ></Modal>
    </div>
  );
};

export default UpcomingPaymentsScene;
