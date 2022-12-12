import React from "react";

const Button = ({
  children,
  type = "button",
  fullWidth,
  size,
  icon = "",
  onClick = () => {},
  className = "",
  color,
}) => {
  return (
    <button
      className={`inline-block active:scale-95 transition-transform focus:outline-none ${className} ${
        fullWidth && "w-full"
      }
      ${ButtonColor(color)}
      ${ButtonSize(size)}
      `}
      type={type}
      onClick={onClick}
    >
      <span className={`flex gap-2 items-center justify-center`}>
        {icon !== "" && <span className={`${IconSize(size)}`}>{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default Button;

const ButtonSize = (size = "default") =>
  ({
    default: "text-base px-8 py-2.5 rounded-lg",
    sm: "text-sm px-6 py-2 rounded-md",
    lg: "text-lg px-10 py-2.5 rounded-lg",
  }[size]);

const ButtonColor = (color = "default") =>
  ({
    default:
      "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white",
    yellow:
      "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-secondary-500",
  }[color]);

const IconSize = (size = "default") =>
  ({
    default: "[&>*]:w-5 [&>*]:h-5",
    sm: "[&>*]:w-4 [&>*]:h-4",
  }[size]);
