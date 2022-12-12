import React from "react";

const Label = ({ children, required }) => {
  return (
    <label className="font-medium mb-[2px] flex items-center gap-1.5">
      {children}
      {required && (
        <span className=" text-rose-400 font-bold ml-[.15rem]">*</span>
      )}
    </label>
  );
};

export default Label;
