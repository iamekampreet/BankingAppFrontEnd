import RootPageScene from "../scene/root-page";
import HomePage from "../scene/home-page";
import { getUserAndTokenFromStorage } from "../utils/utils";

const RootPage = () => {
  const { user } = getUserAndTokenFromStorage();

  return user ? <RootPageScene /> : <HomePage />;
};

export default RootPage;
