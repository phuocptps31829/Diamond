import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ dataTotalPatientsByYear, dataAllSpecialties }) => {
  const mergeData = (specialties, patientData) => {
    let totalPatientsBySpecialty = {};

    specialties.forEach((specialty) => {
      totalPatientsBySpecialty[specialty._id] = 0;
    });

    patientData.forEach((yearData) => {
      yearData.specialties.forEach((specialtyData) => {
        const specialtyID = specialtyData.specialtyID;
        const specialty = specialties.find((s) => s._id === specialtyID);

        if (specialty) {
          totalPatientsBySpecialty[specialtyID] += specialtyData.totalCount;
        }
      });
    });

    return totalPatientsBySpecialty;
  };

  const mergedData = mergeData(dataAllSpecialties, dataTotalPatientsByYear);

  const labels = Object.keys(mergedData).map((specialtyID) => {
    const specialty = dataAllSpecialties.find((s) => s._id === specialtyID);
    return specialty ? specialty.name : "";
  });

  const data = {
    labels: labels,
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
          filter: (legendItem) => {
            return legendItem.index < 6;
          },
        },
      },
    },
    cutout: "60%",
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
