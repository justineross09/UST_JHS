import React from "react";

const ErrorMessage = ({ children }) => {
  return (
    <div className={`absolute -bottom-6 left-0 text-sm text-red-400 mt-1`}>
      {children}
    </div>
  );
};

export default ErrorMessage;
