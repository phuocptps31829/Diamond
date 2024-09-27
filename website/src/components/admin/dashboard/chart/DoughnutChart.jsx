import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ dataTotalPatientsByYear, dataAllSpecialties }) => {
  const mergeData = (specialties, patientData) => {
    let totalPatientsBySpecialty = {};

    specialties.forEach((specialty) => {
      totalPatientsBySpecialty[specialty.name] = 0;
    });

    patientData.forEach((yearData) => {
      yearData.details.forEach((monthData) => {
        monthData.details.forEach((detail) => {
          detail._id.specialtyID.forEach((specialtyID) => {
            const specialty = specialties.find((s) => s._id === specialtyID);
            if (specialty) {
              totalPatientsBySpecialty[specialty.name] += detail.totalCount;
            }
          });
        });
      });
    });

    return totalPatientsBySpecialty;
  };

  const mergedData = mergeData(dataAllSpecialties, dataTotalPatientsByYear);

  const data = {
    labels: Object.keys(mergedData),
    datasets: [
      {
        label: "Bệnh nhân",
        data: Object.values(mergedData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6633",
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
            size: 12,
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
