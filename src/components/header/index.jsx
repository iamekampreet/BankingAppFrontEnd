import "./styles.css";
import Container from "./components/container";
import Navigation from "./components/navigation";

const Header = ({ title }) => {
  return (
    <>
      <Container />
      <Navigation title={title} />
    </>
  );
};

export default Header;
