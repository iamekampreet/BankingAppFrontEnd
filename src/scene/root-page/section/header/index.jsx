import { useCallback, useContext } from "react";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import Button from "../../../../components/button";
import "./styles.css";

const Header = () => {
  const getFormattedDate = useCallback(() => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    return formattedDate;
  }, []);

  const { user } = useContext(MyAppContext);

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
            <div className="username-div">
              <img
                className="icon"
                src={process.env.PUBLIC_URL + "/images/user_icon.svg"}
                alt=""
                width="20"
                height="20"
              />
              <div>{user.displayName}</div>
            </div>
            <Button color="secondary" title="Sign Out" icon="lock_icon.png" />
          </div>
        </div>

        <div className="line1">
          <div>
            <span className="date">{getFormattedDate()}</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
