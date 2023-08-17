import { useCallback } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/button";
// import ipadImg from "/images/ipad-lineup-bnr-img.png";
import "./styles.css";

const HomePage = () => {
  const navigate = useNavigate();

  const getFormattedDate = useCallback(() => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }, []);

  return (
    <>
      <header>
        <div className="wrapper">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/rbc_emblem.png"}
              alt=""
              width="90"
              height="50"
            />
            <span className="blue bold">Royal Bank</span>
          </div>

          <div className="header-flex">
            <Button
              color="secondary"
              title="Login"
              icon="lock_icon.png"
              onClick={() => navigate("/auth")}
            />
          </div>
        </div>

        <div className="line1">
          <div>
            <span className="date">{getFormattedDate()}</span>
          </div>
        </div>
      </header>
      <div id="mainContainerHomepage">
        <div id="ipadImageContainer">
          <img src="/images/ipad-lineup-bnr-img.png" alt="IPads" width="80%" />
        </div>
        <div id="getIpadDealContainer">
          <h2>
            Get iPad when you switch to RBC.
            <br />
            Choose from 4 colours!
          </h2>
          <p id="smallTextUnderGetIpad">
            When you open a Signature No Limit Banking or VIP Banking account.
          </p>
          <p id="limitedTimeText">Limited Time Offer</p>
          <p>Offer Ends September 13, 2023. Conditions apply</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
