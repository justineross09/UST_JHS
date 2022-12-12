import { Fragment, Key, ReactNode, useState } from "react";
import { HiCheck, HiSelector } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";
import Label from "./Label";

const SelectField = ({
  fullWidth,
  size,
  data = [],
  objKey = "",
  required = false,
  label = "",
  selected,
  setSelected,
}) => {
  return (
    <div
      className={`flex flex-col ${TextSize(size)}  ${fullWidth && "w-full"}`}
    >
      <Label required={required}>{label}</Label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`relative w-full cursor-default bg-white text-left border border-gray-600 focus:border-primary-800 focus:outline-none  ${SelectSize(
              size
            )}`}
          >
            {objKey !== "" ? (
              <span className="block truncate">{selected[objKey]}</span>
            ) : (
              <span className="block truncate">{selected}</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {data.map((value, valueIdx) => (
                <Listbox.Option
                  key={valueIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none ${OptionSize(size)}  ${
                      active
                        ? "bg-amber-100 text-primary-800"
                        : "text-neutral-900"
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      {objKey !== "" ? (
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {value[objKey]}
                        </span>
                      ) : (
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {value}
                        </span>
                      )}
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectField;

const TextSize = (size = "default") =>
  ({
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  }[size]);

const SelectSize = (size = "default") =>
  ({
    default: "pl-4 py-2.5 pr-10 rounded-md",
    sm: "pl-3.5 py-2 pr-10 rounded-md",
    lg: "pl-4 py-2.5 pr-10 text-lg rounded-md",
  }[size]);

const OptionSize = (size = "default") =>
  ({
    default: "py-2 pl-10 pr-4",
    sm: "py-1.5 pl-10 pr-4",
    lg: "py-2 pl-10 pr-4",
  }[size]);
