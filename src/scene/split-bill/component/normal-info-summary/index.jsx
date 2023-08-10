import "./styles.css";

const NormalInfoSummary = ({ title, value }) => {
  return (
    <>
      <div className="normal-info-summary-container">
        <p>{title}</p>
        <p>{value}</p>
      </div>
      <hr></hr>
    </>
  );
};

export default NormalInfoSummary;
