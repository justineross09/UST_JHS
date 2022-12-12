import React from "react";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { MdMode } from "react-icons/md";

const TextField = ({
  label = "",
  placeholder = "Enter your text here...",
  type = "text",
  onChange,
  value,
  required = false,
  error = "",
  size,
  fullWidth = false,
  onBlur,
  edit = false,
}) => {
  return (
    <div
      className={`relative flex flex-col ${TextSize(size)} ${
        fullWidth && "w-full"
      }`}
    >
      <Label required={required}>{label}</Label>
      <div className="flex relative items-center">
        <input
          className={`flex-1 w-full focus:outline-none border ${
            error !== "" ? "border-red-600" : "border-gray-800"
          } focus:border-primary-900 ${TextFieldSize(size)}
      `}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {edit && (
          <div className={`z-10 absolute cursor-pointer ${TextIcon(size)}`}>
            <MdMode />
          </div>
        )}
      </div>
      {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default TextField;

const TextSize = (size = "default") =>
  ({
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  }[size]);

const TextFieldSize = (size = "default") =>
  ({
    default: "py-2.5 px-4 rounded-md",
    sm: "px-3.5 py-2 rounded-md",
    lg: "px-4 py-2.5 rounded-md",
  }[size]);

const TextIcon = (size = "default") =>
  ({
    default: "[&>*]:w-5 [&>*]:h-5 right-4",
    sm: "[&>*]:w-4 [&>*]:h-4 right-3",
    lg: "[&>*]:w-5 [&>*]:h-5 right-5",
  }[size]);
