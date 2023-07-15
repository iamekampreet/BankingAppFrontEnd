import "./styles.css";
import Button from "../button";

const Container = ({ children }) => {
  return (
    <div className="wrapper">
      <div>
        <img
          src={process.env.PUBLIC_URL + "/images/rbc_emblem.png"}
          alt=""
          width="100"
          height="50"
        />
        <span className="blue bold">Royal Bank</span>
      </div>

      <div className="flex">
        <div className="username-div">
          <img
            className="icon"
            src={process.env.PUBLIC_URL + "/images/user_icon.svg"}
            alt=""
            width="20"
            height="20"
          />
          <div>USER NAME FROM DB</div>
        </div>
        <Button color="secondary">
          <img
            className="icon"
            src={process.env.PUBLIC_URL + "/images/lock_icon.png"}
            alt=""
            width="20"
            height="20"
          />
          <span className="bold">Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Container;
