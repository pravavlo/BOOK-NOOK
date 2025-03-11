document.addEventListener("DOMContentLoaded", () => {
  const userInfoContainer = document.getElementById("user-info-container");
  const userPhoto = document.getElementById("user-photo");
  const userName = document.getElementById("user-name");
  const signInButton = document.getElementById("google-sign-in-btn");
  const logoutButton = document.getElementById("sign-out-btn");

  // Retrieve user info from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    // Show user info
    userInfoContainer.style.display = "flex"; // Show the user info
    userName.textContent = user.name;
    userPhoto.src = user.photo;
    signInButton.style.display = "none"; // Hide sign-in button
  } else {
    // Hide user info
    userInfoContainer.style.display = "none";
    signInButton.style.display = "inline-block";
  }

  // Logout functionality
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      sessionStorage.removeItem("user"); // Remove from sessionStorage
      window.location.reload(); // Reload to update UI
    });
  }
});
