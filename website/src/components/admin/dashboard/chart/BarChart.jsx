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

const BarChart = ({ dataPatientsByGenderAndByYear }) => {
  const maleDataByMonth = new Array(12).fill(0);
  const femaleDataByMonth = new Array(12).fill(0);

  dataPatientsByGenderAndByYear.forEach((yearData) => {
    yearData.details.forEach((monthData) => {
      const month = monthData._id.month;
      if (month <= 12) {
        monthData.details.forEach((patientData) => {
          const gender = patientData.user[0].gender;
          if (gender === "Nam") {
            maleDataByMonth[month - 1] += 1;
          } else if (gender === "Nữ") {
            femaleDataByMonth[month - 1] += 1;
          }
        });
      }
    });
  });

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
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Nam",
        data: maleDataByMonth,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Nữ",
        data: femaleDataByMonth,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

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
