import "./styles.css";

const Button = ({ color, icon, title, onClick }) => {
  const buttonStyle = {
    backgroundColor: `var(--color-${color})`,
    color: color === "primary" ? "white" : "black",
    padding: `10px`,
  };

  return (
    <button style={buttonStyle} onClick={onClick} className="button-style">
      <img
        className="icon"
        src={process.env.PUBLIC_URL + `/images/${icon}`}
        alt=""
        width="20"
        height="20"
      />
      <span>{title}</span>
    </button>
  );
};

export default Button;
