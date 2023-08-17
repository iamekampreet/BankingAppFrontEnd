import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

import Input from "../../../../components/formElements/Input";
import Button from "../../../../components/formElements/Button";
import { MyAppContext } from "../../../../provider/MyAppProvider";
import { saveUserAndTokenToStorage } from "../../../../utils/utils";

const SignupSection = (props) => {
  const context = useContext(MyAppContext);

  const navigate = useNavigate();

  const [debitCard, setDebitCard] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const emailChangeHandler = (data) => {
    setEmail(data.target.value);
  };

  const debitCardChangeHandler = (data) => {
    setDebitCard(data.target.value);
  };

  const lastNameChangeHandler = (data) => {
    setLastName(data.target.value);
  };

  const passwordChangeHandler = (data) => {
    setPassword(data.target.value);
  };

  const confirmPasswordChangeHandler = (data) => {
    setConfirmPassword(data.target.value);
  };

  const signupFormSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            debitCard: debitCard,
            lastName: lastName,
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

      console.log(context);
      console.log(responseData);
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
      return;
    }

    navigate("/");
  };

  return (
    <>
      <form onSubmit={signupFormSubmitHandler}>
        <Input
          id="signupDebitCard"
          label="Debit Card"
          // type="number"
          errorText="Please enter a valid debit card number"
          changeHandler={debitCardChangeHandler}
          // onInput={}
        />

        <Input
          id="signupLastName"
          label="Last Name"
          type="string"
          errorText="Please enter a valid last name"
          changeHandler={lastNameChangeHandler}
          // onInput={}
        />

        <Input
          id="signupUsername"
          label="Username / Email"
          type="email"
          errorText="Please enter a valid email"
          changeHandler={emailChangeHandler}
          // onInput={}
        />

        <Input
          id="signupPassword"
          label="Password"
          type="password"
          errorText="Please enter a valid password"
          changeHandler={passwordChangeHandler}
          // onInput={}
        />

        <Input
          id="signupConfirmPassword"
          label="Confirm Password"
          type="password"
          errorText="Passwords doesn't match"
          changeHandler={confirmPasswordChangeHandler}
          // onInput={}
        />

        <p>{error}</p>

        <Button type="submit">SIGN UP</Button>
      </form>
      <p id="loginInstead" onClick={props.loginInsteadClickHandler}>
        Login instead?
      </p>
    </>
  );
};

export default SignupSection;
