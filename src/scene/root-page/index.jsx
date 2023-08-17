import { Outlet, useNavigate } from "react-router-dom";
import Header from "./section/header";
import MainMenu from "./section/main-menu/MainMenu";

import "./styles.css";
import ImageContainer from "./section/image-container";
import { useContext, useEffect } from "react";
import { AppConfigContext } from "antd/es/app/context";
import { MyAppContext } from "../../provider/MyAppProvider";


const RootPageScene = () => {
  const { contextHolder, messageApi } = useContext(MyAppContext);

  return (
    <div className="root-container">
      {contextHolder}
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
