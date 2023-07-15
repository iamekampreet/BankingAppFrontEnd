import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import ImageContainer from "../image-container";

const Navigation = () => {
  const [display, setDisplay] = useState("accounts");
  const [date, setDate] = useState("");
  const [activeDisplay, setActiveDisplay] = useState("accounts");

  const displays = [
    { key: "accounts", value: "Accounts Summary" },
    { key: "moveMoney", value: "Move Money" },
    { key: "profileSettings", value: "Profile & Account Settings" },
  ];

  const handleClick = (value) => {
    setDisplay(value);
    setActiveDisplay(value);
  };

  const getFormattedDate = useCallback(() => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }, []);

  useEffect(() => {
    setDate(getFormattedDate());
  }, [getFormattedDate]);

  return (
    <>
      <div className="line1">
        <div>
          <span className="date">{date}</span>
        </div>
      </div>
      <div className="line2">
        <div>
          {displays.map((element) => (
            <span
              key={element.key}
              className={activeDisplay === element.key ? "active" : "nav"}
              onClick={() => handleClick(element.key)}
            >
              {element.value}
            </span>
          ))}
        </div>
      </div>
      <ImageContainer display={display} />
    </>
  );
};

export default Navigation;
