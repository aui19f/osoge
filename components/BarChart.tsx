"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["월", "화", "수", "목", "금", "토", "일"];

const data = {
  labels,
  datasets: [
    {
      label: "접수량",
      data: [12, 19, 10, 5, 2, 3, 7], // 예시 접수량
      // backgroundColor: "rgba(59, 130, 246, 0.6)", // Tailwind의 blue-500
      backgroundColor: [
        "rgba(59, 130, 246, 0.6)", // 월 - blue-500
        "rgba(16, 185, 129, 0.6)", // 화 - green-500
        "rgba(245, 158, 11, 0.6)", // 수 - yellow-500
        "rgba(239, 68, 68, 0.6)", // 목 - red-500
        "rgba(99, 102, 241, 0.6)", // 금 - indigo-500
        "rgba(236, 72, 153, 0.6)", // 토 - pink-500
        "rgba(139, 92, 246, 0.6)", // 일 - violet-500
      ],

      borderRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // 범례 숨기기
      position: "top" as const,
    },
    title: {
      display: false,
      text: "요일별 접수량",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
};

export default function BarChart() {
  return <Bar options={options} data={data} />;
}
