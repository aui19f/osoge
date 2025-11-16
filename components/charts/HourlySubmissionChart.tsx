"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: "10시", count: 1 },
  { hour: "11시", count: 4 },
  { hour: "12시", count: 2 },
  { hour: "13시", count: 0 },
  { hour: "14시", count: 0 },
  { hour: "15시", count: 5 },
  { hour: "16시", count: 8 },
  { hour: "17시", count: 5 },
  { hour: "18시", count: 6 },
  { hour: "19시", count: 8 },
];

export default function HourlyChart() {
  return (
    <div className="w-full h-[320px] flex items-center justify-center bg-white rounded-xl shadow p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" interval={0} />
          <YAxis width={30} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
