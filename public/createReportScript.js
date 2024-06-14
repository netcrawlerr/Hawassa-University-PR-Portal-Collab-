let numDetails = {};
let currentReport = 0;

/**
 *  i might create elements as needed
 *  might use local storage
 *  prevent form submission
 */

// show report details
// show report details
function showReportDetails(reportNumber) {
  const reportTopicsContainer = document.getElementById("reportTopics");
  reportTopicsContainer.innerHTML = "";

  if (!numDetails[reportNumber]) {
    numDetails[reportNumber] = 1;
  }

  for (let i = 1; i <= numDetails[reportNumber]; i++) {
    const reportDetailContainer = document.createElement("div");

    const reportDetail = document.createElement("textarea");
    reportDetail.setAttribute("placeholder", `Please Enter detail `);
    reportDetail.setAttribute("required", true);

    // Assigning a unique value to the textarea
    const textareaValue = `detail_${i}`;
    reportDetail.setAttribute("name", textareaValue);

    reportDetailContainer.appendChild(reportDetail);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function () {
      reportDetailContainer.remove();
      numDetails[currentReport]--;
    };
    reportDetailContainer.appendChild(deleteButton);

    reportTopicsContainer.appendChild(reportDetailContainer);
  }

  // Show the "Add Detail" button when a sidebar button is clicked
  document.getElementById("addDetailButton").style.display = "block";

  currentReport = reportNumber;
}

//  add a new report textarea

// add a new report textarea
function addReportDetail() {
  const reportTopicsContainer = document.getElementById("reportTopics");

  const reportDetailContainer = document.createElement("div");

  // delete top most textarea
  deleteTopmostDetail();
  const reportDetail = document.createElement("textarea");
  reportDetail.setAttribute("placeholder", `Please Enter detail `);

  // Assigning a unique value to the textarea
  const textareaValue = `detail_${numDetails[currentReport]}`;
  reportDetail.setAttribute("name", textareaValue);

  reportDetailContainer.appendChild(reportDetail);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-button");
  deleteButton.onclick = function () {
    reportDetailContainer.remove();
    numDetails[currentReport]--;
  };
  reportDetailContainer.appendChild(deleteButton);

  reportTopicsContainer.appendChild(reportDetailContainer);

  numDetails[currentReport] = Number(numDetails[currentReport]) + 1;
}

let deleteExecuted = false;
function deleteTopmostDetail() {
  if (!deleteExecuted) {
    const reportTopicsContainer = document.getElementById("reportTopics");
    // Check if there are any report details
    if (reportTopicsContainer.children.length > 0) {
      // Remove the first child, which is the topmost detail
      reportTopicsContainer.removeChild(reportTopicsContainer.children[0]);
      // Decrement the number of details for the current report
      numDetails[currentReport]--;
    }
    deleteExecuted = true;
  }
}

function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.style.display === "block"
    ? (dropdownContent.style.display = "none")
    : (dropdownContent.style.display = "block");
}

// document.getElementById("submitButton").addEventListener("click", function (e) {
//   e.preventDefault();
//   alert("Submitted");
// });

// Event listener for form submission
// document.getElementById("reportForm").addEventListener("submit", function (e) {
//   e.preventDefault(); // Prevent default form submission
//   submitReportData(); // Call function to submit report data
// });

document.addEventListener("submit", function (e) {
  if (e.target && e.target.id === "reportForm") {
    e.preventDefault(); // Prevent default form submission
    submitReportData(); // Call function to submit report data
    alert("Submitted");
    window.location.reload();
  }
});
// Event listener for "Add Detail" button click
// document
//   .getElementById("addDetailButton")
//   .addEventListener("click", function () {
//     addReportDetail(); // Call function to add a new report detail
//   });

// get all textarea values
// {
//   const textareas = document.querySelectorAll("textarea");
//   const reportData = {};

//   textareas.forEach((textarea) => {
//     reportData[textarea.name] = textarea.value;
//   });

//   // sending collected data (textareas)
//   fetch("/tasks/submitReport", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(reportData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// createReportScript.js

// Function to fetch textarea values
function getTextareaValues() {
  const textareas = document.querySelectorAll("textarea");
  const values = [];
  textareas.forEach((textarea) => {
    values.push(textarea.value);
  });
  console.log(textareas);
  return values;
}

// Function to submit report data
function submitReportData() {
  const textareas = getTextareaValues(); // Get textarea values

  const goalId = currentReport; // Use the currentReport variable as the goal_id
  fetch("/tasks/submitReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goal_id: goalId, textareas: textareas }), // Send textarea values in JSON format
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document
  .getElementById("reportForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const goalID = currentReport;

    try {
      const response = await fetch("/tasks/viewReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal_id: goalID }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      console.log("Reports:", data);
      // Here you can handle the response data and display the reports on the UI
    } catch (error) {
      console.error("Error fetching reports:", error);
      // Handle the error condition, such as displaying an error message to the user
    }
  });
