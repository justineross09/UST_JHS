import React from "react";

const UnstyledButton = ({
  children,
  type = "button",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      type={type}
      className={` p-2 inline-block active:scale-95 transition-transform rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default UnstyledButton;
