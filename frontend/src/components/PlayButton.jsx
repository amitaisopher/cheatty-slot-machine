import React from "react";
import BasicButton from "./BasicButton";

const CustomButton = ({ onClickHandler, className, title = "PLAY", ...rest }) => {
  return (
    <BasicButton
      className={className}
      onClickHandler={onClickHandler}
      title={title}
      {...rest}
    />
  );
};

export default CustomButton;
