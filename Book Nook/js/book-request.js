// Get user data from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const bookListDiv = document.getElementById("book-request-list");
  const bookRequests = JSON.parse(localStorage.getItem("bookRequests")) || [];
  if (bookRequests.length === 0) {
    bookListDiv.innerHTML = `<div class="d-flex gap-2 align-items-center justify-content-center text-primary my-5 py-5"><h5 class="p-5 rounded text-center bg-light">No book rental requests have been placed yet.</h5></div>`;
  } else {
    bookRequests.forEach((request, index) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card align-items-center";
      bookCard.innerHTML = `
                    <img src="${
                      request.userPhoto
                    }" class="img-thumbnail rounded-circle" alt="${
        request.userPhoto
      }">
                    <div class="book-details">
                     <small class="text-end truncate mb-2">Requested on: ${
                       request.requestTime || "-"
                     }</small>
                        <p class="truncate mb-0">${request.userName}</p>
                        <small class="fst-italic truncate mb-2">${
                          request.userEmail
                        }</small>
                        <h5 class="truncate font-monospace text-uppercase">${
                          request.selectedBookTitle
                        }</h5>
                        <div class="d-flex justify-content-end gap-2">
                        <a class="btn btn-outline-success btn-sm" id="btnAcceptRequest" onclick="acceptRequest(${
                          request.id
                        })"><i class="fa-solid fa-circle-check me-1"></i>Accept</a>
                        <a id="btnRejectRequest" class="btn btn-outline-danger btn-sm rounded" onclick="rejectRequest(${
                          request.id
                        })"><i class="fa-solid fa-circle-xmark me-1"></i>Reject</a>
                    </div>
                    </div> 
                `;

      bookListDiv.appendChild(bookCard);
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

// function actionButtonsRenderer(params) {
//   let acceptButton = ``;
//   let rejectButton = ``;
//   rejectButton = `
//                       <a id="btnRejectRequest" class="text-link text-decoration-none text-danger" role="button">
//                       <i class="fa-solid fa-circle-xmark me-1"></i>Reject</a>`;

//   acceptButton = `<a class="text-link text-decoration-none text-success" role="button" id="btnAcceptRequest"><i class="fa-solid fa-circle-check me-1"></i>Accept</a>`;
//   let buttons = `<div class="d-flex gap-3 justify-content-center">
//                  ${acceptButton}
//                  ${rejectButton}</div>`;

//   var eDiv = document.createElement("div");
//   eDiv.innerHTML = buttons;
//   var editControl = eDiv.querySelector("#btnAcceptRequest");
//   editControl.addEventListener("click", function (event) {
//     //acceptRequest(params);
//   });

//   var editControl = eDiv.querySelector("#btnRejectRequest");
//   editControl.addEventListener("click", function (event) {
//     //rejectRequest(params);
//   });
//   return eDiv;
// }
