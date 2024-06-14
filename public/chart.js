const datasets = [
  {
    label: "Dataset 1",
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderWidth: 1,
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  },
  {
    label: "Dataset 2",
    data: [12, 23],
    backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
    borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
    borderWidth: 1,
    labels: ["Male", "Female"],
  },
  // Add more datasets here
];

const ctx = document.getElementById("myChart").getContext("2d");
let myChart;

function createChart(type, labels, data, backgroundColor, borderColor) {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: datasets[0].label,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function loadData(index) {
  const selectedDataset = datasets[index];
  createChart(
    document.getElementById("chartType").value,
    selectedDataset.labels,
    selectedDataset.data,
    selectedDataset.backgroundColor,
    selectedDataset.borderColor
  );
}

function updateChartType() {
  const chartType = document.getElementById("chartType").value;
  const currentData = myChart.data.datasets[0];
  myChart.destroy();
  myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: currentData.labels,
      datasets: [currentData],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
