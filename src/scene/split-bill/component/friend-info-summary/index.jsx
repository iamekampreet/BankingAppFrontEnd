import "./styles.css";

const FriendInfoSummary = ({ name, phone, splitAmount }) => {
  return (
    <>
      <div className="friend-summary-container">
        <div>
          <p>{name}</p>
          <p>{phone}</p>
        </div>
        <p>{splitAmount}</p>
      </div>
      <hr></hr>
    </>
  );
};

export default FriendInfoSummary;
