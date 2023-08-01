import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import ImageContainer from "../../scene/root-page/section/image-container";

const Navigation = ({ title }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");

  const displays = [
    { key: "accounts", value: "Accounts Summary" },
    { key: "moveMoney", value: "Move Money" },
    { key: "profileSettings", value: "Profile & Account Settings" },
  ];

  const handleClick = (key) => {
    const navigateTo = key === "accounts" ? "" : key;
    navigate("/" + navigateTo);
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
              className={title === element.key ? "active" : "nav"}
              onClick={() => handleClick(element.key)}
            >
              {element.value}
            </span>
          ))}
        </div>
      </div>
      <ImageContainer title={title} />
    </>
  );
};

export default Navigation;
