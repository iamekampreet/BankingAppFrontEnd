import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import "./Login.css";

const Login = () => {
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
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
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

      console.log(responseData);
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
      return;
    }

    navigate("/");
  };

  return (
    <div id="containerBig">
      <div id="logoContainer">
        <img src="/images/rbc_icon.svg" alt="RBC logo" width="8%" />

        <h1>Secure Log-In</h1>
        <h2>RBC Online Banking</h2>
      </div>

      <div id="inputContainer">
        <form onSubmit={loginFormSubmitHandler}>
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
        <Link id="signupLinkLoginPage" to="/signup">
          Signup instead?
        </Link>
      </div>
    </div>
  );
};

export default Login;
