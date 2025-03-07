// Get user data from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const requestList = document.getElementById("request-list");
  const bookRequests = JSON.parse(localStorage.getItem("bookRequests")) || [];

  if (bookRequests.length === 0 ) {
    requestList.innerHTML = "<tr><td colspan='5' class='text-center'>No requests yet.</td></tr>";
  } else {
    bookRequests.forEach((request, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${request.userName}</td>
        <td>${request.userEmail}</td>
        <td><img src="${request.userPhoto}" alt="User Profile" width="40" height="40"></td>
        <td>${request.selectedBookTitle}</td>
        <td>${request.requestTime}</td>

        <td>
        <button class="btn btn-success btn-sm" onclick="acceptRequest(${index})">Accept</button>
        <button class="btn btn-danger btn-sm" onclick="rejectRequest(${index})">Reject</button>
        </td>

      `;
      requestList.appendChild(row);
    });
  }
});

// Function to remove a book request
function removeRequest(index) {
  let bookRequests = JSON.parse(localStorage.getItem("bookRequests")) || [];
  bookRequests.splice(index, 1);
  localStorage.setItem("bookRequests", JSON.stringify(bookRequests));
  location.reload(); // Refresh page to reflect changes
}
