import React, { useState, useContext } from "react";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import Input from "../../../../components/formElements/Input";
import Button from "../../../../components/formElements/Button";
import { saveUserAndTokenToStorage } from "../../../../utils/utils";

const LoginSection = (props) => {
  const { contextHolder } = useContext(MyAppContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailChangeHandler = (data) => {
    setEmail(data.target.value);
  };

  const passwordChangeHandler = (data) => {
    setPassword(data.target.value);
  };

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      saveUserAndTokenToStorage({ ...responseData });
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
      return;
    }

    navigate("/");
  };

  return (
    <>
      <form onSubmit={loginFormSubmitHandler}>
        {contextHolder}
        <Input
          id="username"
          label="Username / Email"
          type="email"
          errorText="Please enter a valid email"
          changeHandler={emailChangeHandler}
          // onInput={}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          errorText="Please enter a valid password"
          changeHandler={passwordChangeHandler}
          // onInput={}
        />

        <p>{error}</p>

        <Button type="submit">LOGIN</Button>
      </form>
      <p id="signupInstead" onClick={props.signupInsteadClickHandler}>
        Signup instead?
      </p>
    </>
  );
};

export default LoginSection;
