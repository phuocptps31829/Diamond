import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ dataTotalPatientsByAges }) => {
  console.log("dataTotalPatientsByAges", dataTotalPatientsByAges);
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

  const ageGroups = {
    "0-18 tuổi": Array(12).fill(0),
    "19-35 tuổi": Array(12).fill(0),
    "36-50 tuổi": Array(12).fill(0),
    "51-65 tuổi": Array(12).fill(0),
    "66 tuổi trở lên": Array(12).fill(0),
  };

  dataTotalPatientsByAges.forEach(({ age, years }) => {
    years.forEach(({ months }) => {
      months.forEach(({ month, count }) => {
        if (age <= 18) {
          ageGroups["0-18 tuổi"][month - 1] += count; // month - 1 vì chỉ số mảng bắt đầu từ 0
        } else if (age <= 35) {
          ageGroups["19-35 tuổi"][month - 1] += count;
        } else if (age <= 50) {
          ageGroups["36-50 tuổi"][month - 1] += count;
        } else if (age <= 65) {
          ageGroups["51-65 tuổi"][month - 1] += count;
        } else {
          ageGroups["66 tuổi trở lên"][month - 1] += count;
        }
      });
    });
  });

  const datasets = Object.keys(ageGroups).map((key, index) => ({
    label: key,
    data: ageGroups[key],
    borderColor: `rgb(${index * 150}, ${index * 40}, ${255 - index * 50})`,
    backgroundColor: `rgba(${index * 150}, ${index * 40}, ${255 - index * 50}, 0.5)`,
    tension: 0.4,
  }));

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "rect",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "rgba(0, 0, 0, 0.1)",
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
          stepSize: 20,
          callback: function (value) {
            return value;
          },
          color: "black",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
