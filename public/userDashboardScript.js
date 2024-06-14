document.addEventListener("DOMContentLoaded", function () {
  const toggleSidebarItem = function (toggleId, menuId) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);

    toggle.addEventListener("click", function () {
      if (menu.style.display === "block") {
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
      }
    });
  };

  // Toggle for Planning
  toggleSidebarItem("planning-toggle", "planning-menu");

  // Toggle for Reporting
  toggleSidebarItem("reporting-toggle", "reporting-menu");
});
