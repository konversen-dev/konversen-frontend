import React from "react";

export default function ReusableTable({ columns = [], data = [] }) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm shadow-gray-300">
      <table className="min-w-full w-full text-sm text-left border-collapse">
        {/* Table Head */}
        <thead className=" text-gray-700 uppercase text-xs">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-5 py-3 font-semibold text-sm text-primary-light whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-blue-50 transition-colors duration-150"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-5 py-3 text-gray-700 whitespace-nowrap"
                  >
                    {/* Jika kolom punya render function, gunakan itu */}
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
