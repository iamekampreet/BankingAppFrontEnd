import "./styles.css";

const FriendInfoSummary = ({ name, phoneNumber, splitAmount }) => {
  return (
    <>
      <div className="friend-summary-container">
        <div>
          <p>{name}</p>
          <p>{phoneNumber}</p>
        </div>
        <p>{splitAmount}</p>
      </div>
      <hr></hr>
    </>
  );
};

export default FriendInfoSummary;
