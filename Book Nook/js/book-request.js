// Get user data from localStorage
const userData = JSON.parse(localStorage.getItem("user"));

if (userData) {
  document.getElementById("user-name").textContent = userData.name;
  document.getElementById("user-email").textContent = userData.email;
  document.getElementById("user-photo").src = userData.photo;
} else {
  console.log("No user is logged in.");
}
