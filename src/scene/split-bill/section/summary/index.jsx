import { useNavigate } from "react-router-dom";
import FriendInfoSummary from "../../component/friend-info-summary";
import NormalInfoSummary from "../../component/normal-info-summary";
import "./styles.css";
import { Button, message } from "antd";
import { useContext } from "react";
import { MyAppContext } from "../../../../provider/MyAppProvider";

const SplitBillSummary = ({ splitInfo, setCurrentSection }) => {
  // const splitInfo = JSON.parse(
  //   '{"amount":"3","friendInfos":[{"name":"Santosh Dhakal","email":"santosh.dhakal07@gmail.com","phone":"+16478365807"},{"name":"Ekampreet Singh","email":"ekam@gmail.com","phone":"+2345345764"}],"accountNumber":"Saving(#234)","userEmail":"santosh.dhakal07@gmail.com","note":"This is a note."}'
  // );
  console.log(JSON.stringify(splitInfo));
  const navigate = useNavigate();
  const { messageApi, token } = useContext(MyAppContext);

  const perPersonSplit = (
    splitInfo.amount /
    (splitInfo.friendInfos.length + 1)
  ).toFixed(2);

  splitInfo.friendInfos.forEach((info) => {
    info.amount = perPersonSplit;
  });
  console.log(`Final = ${JSON.stringify(splitInfo)}`);
  const sendSplitHandler = async () => {
    console.log(process.env.REACT_APP_SPLIT_BILL);
    try {
      const response = await fetch(`${process.env.REACT_APP_SPLIT_BILL}`, {
        method: `POST`,
        body: JSON.stringify(splitInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const message = await response.json();
      messageApi.info(message.message);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (ex) {
      messageApi.info(ex.message);
    }
    console.log(message);
  };

  const onEditClickHandler = async () => {
    setCurrentSection(`input`);
  };

  return (
    <div className="summary-container">
      <div className="summary-request-amount">
        <h2>Total Request Amount</h2>
        <p>{splitInfo.amount}</p>
      </div>
      <div className="friends-list-container">
        {splitInfo?.friendInfos?.map((friend) => (
          <FriendInfoSummary
            key={friend.phoneNumber}
            {...friend}
            splitAmount={perPersonSplit}
          />
        ))}
      </div>
      <NormalInfoSummary title="Deposit Info" value={splitInfo.accountNumber} />
      <NormalInfoSummary title="Your email" value={splitInfo.userEmail} />
      <div className="split-summary-button-container">
        <Button type="primary" size="large" onClick={sendSplitHandler}>
          Send It
        </Button>
        <Button size="large" onClick={onEditClickHandler}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SplitBillSummary;
