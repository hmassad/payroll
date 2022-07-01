import React from "react";

const Button = props => {
  return (
    <Button type={props.type} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};
export default Button;
