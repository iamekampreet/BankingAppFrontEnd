import "./styles.css";

const Button = ({ color, children, onClick }) => {
  const buttonStyle = {
    backgroundColor: `var(--color-${color})`,
  };

  return (
    <button style={buttonStyle} onClick={onClick} className="button-style">
      {children}
    </button>
  );
};

export default Button;
