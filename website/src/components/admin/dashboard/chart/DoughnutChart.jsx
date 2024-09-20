import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: [
      "Mắt",
      "Phụ khoa",
      "Nha khoa",
      "Da liễu",
      "Tai mũi họng",
      "Tim mạch",
    ],
    datasets: [
      {
        label: "Bệnh nhân",
        data: [150, 100, 75, 50, 45, 70],
        backgroundColor: [
          "#008FFB",
          "#E50E9C",
          "#00E396",
          "#FFBB28",
          "#FF4560",
          "#775DD0",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: 13,
            weight: 500,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },

    cutout: "60%",
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
