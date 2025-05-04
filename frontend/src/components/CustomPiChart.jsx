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
import CustomToolTip from "./CustomToolTip";

const CustomPiChart = ({ data, label, totalAmount, color, showTextAnchor }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="Amount"
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
        <Tooltip content={<CustomToolTip />} />
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

export default CustomPiChart;
