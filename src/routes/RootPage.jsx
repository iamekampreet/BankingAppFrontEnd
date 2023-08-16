import { useContext } from "react";
import RootPageScene from "../scene/root-page";
import { MyAppContext } from "../provider/MyAppProvider";
import HomePage from "../scene/home-page";

const RootPage = () => {
  const { user } = useContext(MyAppContext);

  return user ? <RootPageScene /> : <HomePage />;
};

export default RootPage;
