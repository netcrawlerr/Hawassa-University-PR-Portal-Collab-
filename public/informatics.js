function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.style.display === "block"
    ? (dropdownContent.style.display = "none")
    : (dropdownContent.style.display = "block");
}

document.getElementById("submitButton").addEventListener("click", function () {
  alert("Submitted");
});

document.getElementById("reportForm").addEventListener("submit", function (e) {
  e.preventDefault();
});
