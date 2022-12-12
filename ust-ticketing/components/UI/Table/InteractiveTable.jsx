import React from "react";

const InteractiveTable = ({ children, header }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-neutral-200 text-sm">
        <thead>
          <tr>
            {header?.map((column, idx) => (
              <th
                key={idx}
                className="whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

export default InteractiveTable;

export const TableHead = ({ children }) => (
  <th className="whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900 ">
    {children}
  </th>
);

export const TableRow = ({ children }) => (
  <tr className="hover:bg-gray-200">{children}</tr>
);

export const TableColumn = ({ children, className = "" }) => (
  <td
    className={`whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900 ${className}`}
  >
    {children}
  </td>
);

export const TableColumnImage = ({ children }) => (
  <td className="relative flex p-2">{children}</td>
);
