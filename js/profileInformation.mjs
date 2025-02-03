// Displays user information in the dashboard.

const displayName = localStorage.getItem("name");

const profileName = document.getElementById("profileUsername");

profileName.textContent = displayName;
