import { useCallback, useState, useEffect } from "react";
import "./styles.css";

const ImageContainer = ({ username, display }) => {
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
      <div className="display">
        {display === "accounts"
          ? "Accounts Summary"
          : display === "moveMoney"
          ? "Move Money"
          : "Profile & Account Settings"}
      </div>
      <div className="greetings">
        Good {dayTime} {username ? `, ${username}` : ""}
      </div>
    </div>
  );
};

export default ImageContainer;
