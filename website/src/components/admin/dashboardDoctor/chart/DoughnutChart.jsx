import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Nam", "Nữ"],
    datasets: [
      {
        label: "Số lượng",
        data: [70, 45],
        backgroundColor: ["#00E396", "#58BDFF"],
        order: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0, 
        bottom: 20,
        left: 20, 
        right: 20,
      },
    },
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
