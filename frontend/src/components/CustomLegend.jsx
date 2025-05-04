import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 space-x-3 ">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-1">
          <div
            className="w-2.5 h-2.5 rounded"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs capitalize text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
