import React, { useContext, useState } from "react";

import LoginSection from "./section/login";
import SignupSection from "./section/signup";
import "./styles.css";
import { MyAppContext } from "../../provider/MyAppProvider";

const AuthScene = () => {
  const [isLogin, setIsLogin] = useState(1);
  const { contextHolder } = useContext(MyAppContext);

  const changeLoginMode = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  return (
    <div id="containerBig">
      {contextHolder}
      <div id="logoContainer">
        <img src="/images/rbc_icon.svg" alt="RBC logo" width="8%" />

        <h1>Secure Log-In</h1>
        <h2>RBC Online Banking</h2>
      </div>

      <div id="inputContainer">
        {isLogin ? (
          <LoginSection signupInsteadClickHandler={changeLoginMode} />
        ) : (
          <SignupSection loginInsteadClickHandler={changeLoginMode} />
        )}
      </div>
    </div>
  );
};

export default AuthScene;
