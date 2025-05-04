import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
} from "recharts";
import CustomLegend from "./CustomLegend";

const Last60DaysTransactionPiChart = ({
  data,
  label,
  totalAmount,
  color,
  showTextAnchor,
}) => {
  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs text-purple-800 mb-1 font-semibold">
            {payload[0]?.payload?.name}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0]?.value}
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="Name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % color.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomToolTip} />
        <Legend content={<CustomLegend />} />
        {showTextAnchor ? (
          <>
            <Text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </Text>
            <Text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="600"
            >
              {totalAmount}
            </Text>
          </>
        ) : null}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Last60DaysTransactionPiChart;
