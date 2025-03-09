// Get user data from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const requestList = document.getElementById("request-list");

  const bookRequests = JSON.parse(localStorage.getItem("bookRequests")) || [];
  const gridColumnDefs = [
    { field: "userName", headerName: "User" },
    { field: "userEmail", headerName: "Email" },
    {
      field: "userPhoto",
      headerName: "Photo",
      cellRenderer: (params) => {
        return `<img src="${params.value}" alt="User Photo" style="width: 50px; height: 50px;" />`;
      },
    },
    { field: "selectedBookTitle", headerName: "Book Title" },
    { field: "requestTime", headerName: "Request Time" },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      filter: false,
      pinned: "right",
      suppressMovable: true,
      lockPosition: "right",
      suppressFiltersToolPanel: true,
      suppressColumnsToolPanel: true,
      resizable: false,
      cellRenderer: actionButtonsRenderer,
    },
  ];
  const gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    },
    // Row Data: The data to be displayed.
    rowData: bookRequests,
    // Column Definitions: Defines the columns to be displayed.
    columnDefs: gridColumnDefs,
    pagination: true,
    autoSizeStrategy: {
      type: "fitGridWidth"
    }
  };

  // Your Javascript code to create the Data Grid
  const myGridElement = document.querySelector("#bookRequestGrid");
  agGrid.createGrid(myGridElement, gridOptions);

  if (bookRequests.length === 0) {
    requestList.innerHTML =
      "<tr><td colspan='6' class='text-center'>No requests yet.</td></tr>";
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

function actionButtonsRenderer(params) {
  let acceptButton = ``;
  let rejectButton = ``;
  rejectButton = `
                      <a id="btnRejectRequest" class="text-link text-decoration-none text-danger" role="button">
                      <i class="fa-solid fa-circle-xmark me-1"></i>Reject</a>`;

  acceptButton = `<a class="text-link text-decoration-none text-success" role="button" id="btnAcceptRequest"><i class="fa-solid fa-circle-check me-1"></i>Accept</a>`;
  let buttons = `<div class="d-flex gap-3 justify-content-center">
                 ${acceptButton}
                 ${rejectButton}</div>`;

  var eDiv = document.createElement("div");
  eDiv.innerHTML = buttons;
  var editControl = eDiv.querySelector("#btnAcceptRequest");
  editControl.addEventListener("click", function (event) {
    //acceptRequest(params);
  });

  var editControl = eDiv.querySelector("#btnRejectRequest");
  editControl.addEventListener("click", function (event) {
    //rejectRequest(params);
  });
  return eDiv;
}
