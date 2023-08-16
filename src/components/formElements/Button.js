import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a className={`customButton`} href={props.href}>
        {props.children}
      </a>
    );
  } else if (props.to) {
    return (
      <Link className={`customButton`} to={props.to} exact={props.exact}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`customButton`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
