import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = () => {
  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Nam",
        data: [60, 50, 40, 70, 80, 60, 65, 55, 60], // Example data for males
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Light blue for males
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Nữ",
        data: [40, 10, 30, 20, 40, 50, 55, 50, 45], // Example data for females
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Darker blue for females
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      y: {
        type: "number",
        easing: "easeInOutQuad",
        from: 0,
        duration: 1200,
      },
    },

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: 13,
          },
          usePointStyle: true,
          pointStyle: "rect",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Tắt lưới dọc
        },
        ticks: {
          color: "black",
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "black",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
