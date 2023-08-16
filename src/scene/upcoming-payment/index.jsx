import { useContext, useEffect, useState } from "react";
import UpcomingPaymentRow from "./components/upcoming-payment-row";
import "./styles.css";
import { MyAppContext } from "../../provider/MyAppProvider";

const UpcomingPaymentsScene = () => {
  const [upcomingPayments, setUpcomingPayments] = useState();
  const { token } = useContext(MyAppContext);

  const fetchUpcomingPayments = async () => {
    const response = await fetch(`${process.env.REACT_APP_UPCOMING_PAYMENTS}`, {
      method: `GET`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setUpcomingPayments(data);
    if (response.status) console.log();
  };

  useEffect(() => {
    fetchUpcomingPayments();
  }, []);

  console.log(upcomingPayments);

  return (
    <div className="upcoming-payment-container">
      <h2>Upcoming Payments</h2>
      {upcomingPayments?.map((upcomingPayment) => {
        return (
          <UpcomingPaymentRow
            payeeName={upcomingPayment.to.displayName}
            amount={upcomingPayment.amount}
            date={upcomingPayment.date}
          />
        );
      })}
    </div>
  );
};

export default UpcomingPaymentsScene;
