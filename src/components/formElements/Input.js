import React from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <div className={`inputElement`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.changeHandler}
      />
    </div>
  );
};

export default Input;
