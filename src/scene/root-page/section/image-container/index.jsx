import { useCallback, useState, useEffect, useContext } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";

const keyLabelMap = {
  "/": "Accounts Summary",
  "/move-money/transfer-between-account": "Transfer Between My Accounts",
  "/move-money/pay-bill": "Pay a Bill",
  "/move-money/add-payee": "Add payee",
  "/move-money/upcoming-payments": "Upcoming payments",
  "/move-money-interac-transfer": "Send Money with Interac e-Transfer",
  "/move-money/split-bill": "Split with Friends",
  "/move-money/split-request-history": "Split History",
  "/move-money/requested-split": "Requested Split",
  "/settings": "Profile & Account Settings",
};

const ImageContainer = ({ username, title }) => {
  const location = useLocation();

  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/mountain_background.png)`,
    backgroundSize: "cover",
  };

  const [dayTime, setDayTime] = useState("Afternoon");

  const getTimeOfDay = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();

    const sunrise = 6; // Example value for sunrise hour
    const sunset = 18; // Example value for sunset hour

    if (hour >= sunrise && hour < 12) {
      return "Morning";
    } else if (hour >= 12 && hour < sunset) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }, []);

  useEffect(() => {
    setDayTime(getTimeOfDay());
  }, [getTimeOfDay]);

  return (
    <div className="image-background" style={backgroundImageStyle}>
      <div className="display">{keyLabelMap[location.pathname]}</div>
      <div className="greetings">
        Good {dayTime} {username ? `, ${username}` : ""}
      </div>
    </div>
  );
};

export default ImageContainer;
