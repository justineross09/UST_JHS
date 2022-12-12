import React, { ReactNode } from "react";

const DisplayTable = ({ data = [], header }) => {
  const columns = Object.keys(data[0] || []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-neutral-200 text-sm">
        <thead className="bg-tertiary-500">
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
        <div className="h-2"></div>
        <tbody className="divide-y bg-tertiary-200 divide-gray-200 mt-2">
          {data?.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-200">
              {columns?.map((column, idx) => (
                <td
                  key={idx}
                  className="whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900"
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
