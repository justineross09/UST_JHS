import React, { useState, useCallback } from "react";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const PasswordField = ({
  label = "",
  placeholder = "Enter your text here...",
  onChange,
  value,
  required = false,
  error = "",
  autoComplete = "on",
  onBlur,
  fullWidth = false,
}) => {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow((state) => !state), []);

  return (
    <div className={` ${fullWidth && "w-full"} relative flex flex-col`}>
      <Label required={required}>{label}</Label>
      <div className="flex relative items-center">
        <input
          className={`flex-1 w-full py-2.5 pl-4 pr-12 focus:outline-none rounded-lg border  ${
            error !== "" ? "border-red-600" : "border-gray-300"
          } focus:border-primary-600`}
          placeholder={placeholder}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          onBlur={onBlur}
        />
        <div className="z-20 absolute right-5 cursor-pointer">
          {show ? (
            <RiEyeOffLine onClick={toggle} className="w-5 h-5" />
          ) : (
            <RiEyeLine onClick={toggle} className="w-5 h-5" />
          )}
        </div>
      </div>
      {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default PasswordField;
