import { Outlet } from "react-router-dom";
import Header from "./section/header";
import MainMenu from "./section/main-menu/MainMenu";

import "./styles.css";
import ImageContainer from "./section/image-container";

const RootPageScene = () => {
  return (
    <div className="root-container">
      <Header />
      <ImageContainer className="image" title="navigation" />
      <MainMenu />
      <main>
        <Outlet />
      </main>
      {/* TODO footer */}
    </div>
  );
};

export default RootPageScene;
