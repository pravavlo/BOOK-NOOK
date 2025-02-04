
const searchBtn = document.getElementById("formSubmit");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("searchResult");
const searchButton = document.getElementById("search-btn");
const API_KEY = typeof GOOGLE_API_KEY !== "undefined" ? GOOGLE_API_KEY : "Prod_GOOGLE_API_KEY";
const booksFromLocalStorage = JSON.parse(localStorage.getItem("books")) || [];
document.addEventListener("DOMContentLoaded", () => {
  searchInput.value = sessionStorage.getItem("searchQuery") || "";
  handleSubmit(event);
});
const handleSubmit = (event) => {
  event.preventDefault();
  const query = searchInput.value;
  resultsDiv.innerHTML = "";
  if (query.trim() === "") {
    sessionStorage.removeItem("searchQuery");
    return;
  }
  sessionStorage.setItem("searchQuery", query);
  document
    .querySelector(".loader-container")
    .classList.replace("d-none", "d-flex");

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      resultsDiv.innerHTML = "";
      document
        .querySelector(".loader-container")
        .classList.replace("d-flex", "d-none");
      // Clear previous results
      if (data.items && data.items.length > 0) {
        data.items.forEach((book, index) => {
          const bookCard = document.createElement("div");
          bookCard.className = "col-sm-4";
          const bookImage = book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : "https://via.placeholder.com/80x120";

          let description =
            book.volumeInfo.description || "No description available";

          bookCard.innerHTML = `
             <div class="card">
            <div class="row g-0">
              <div class="col-12 col-md-4">
                <div class="card-image-container">
                  <img
                    src="${bookImage}" alt="${
            book.volumeInfo.title
          }" class="img-fluid rounded-start"
                  />
                </div>
              </div>
              <div class="col-12 col-md-8">
                <div
                  class="card-body d-flex flex-column justify-content-between gap-3"
                >
                  <div>
                    <h5 class="card-title text-truncate">${
                      book.volumeInfo.title
                    }</h5>
                    <small class="card-text fst-italic truncate">
                    ${
                      book.volumeInfo.authors
                        ? book.volumeInfo.authors.join(", ")
                        : "Unknown Author"
                    }
                      </small>
                  </div>

                  <small class="card-text truncate">
                    ${description}
                  </small>
                  <div class="row">
                    <div class="col-6">
                      <a href="#" class="btn btn-primary btn-sm w-100 text-nowrap" book-title="${
                        book.volumeInfo.title
                      }" book-author="${
            book.volumeInfo.authors
          }" book-page-count="${
            book.volumeInfo.pageCount
          }" book-description="${description}" book-thumbnail="${bookImage}" id="btnView${index}" onclick="viewBook(true, event, ${index})">View</a>
                    </div>
                    <div class="col-6">
                      <button class="btn ${
                        booksFromLocalStorage
                          .map((b) => b.title)
                          .includes(book.volumeInfo.title)
                          ? "btn-danger"
                          : "btn-primary"
                      } btn-sm w-100 add-btn text-nowrap" id="btnDelete${index}" onclick="addOrRemoveBook(true, event, ${index})"  book-title="${
            book.volumeInfo.title
          }" 
                                book-author="${
                                  book.volumeInfo.authors
                                    ? book.volumeInfo.authors.join(", ")
                                    : "Unknown Author"
                                }"
                                book-description="${description}" 
                                book-page-count="${
                                  book.volumeInfo.pageCount || "N/A"
                                }"
                                book-thumbnail="${bookImage}">${
            booksFromLocalStorage
              .map((b) => b.title)
              .includes(book.volumeInfo.title)
              ? "Remove"
              : "Add"
          }</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;
          resultsDiv.appendChild(bookCard);
        });

        // Add click event listeners for "Read More" buttons
        document.querySelectorAll(".read-more-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const shortDesc = btn.previousElementSibling.previousElementSibling;
            const fullDesc = btn.previousElementSibling;
            const isExpanded = fullDesc.style.display === "inline";

            if (isExpanded) {
              fullDesc.style.display = "none";
              shortDesc.style.display = "inline";
              btn.textContent = "Read More";
            } else {
              fullDesc.style.display = "inline";
              shortDesc.style.display = "none";
              btn.textContent = "Read Less";
            }
          });
        });

        // Add click event listeners to "Add Book" buttons
        // document.querySelectorAll(".add-btn").forEach((btn) => {
        //   btn.addEventListener("click", () => {
        //     const bookData = {
        //       title: btn.getAttribute("data-title"),
        //       author: btn.getAttribute("data-author"),
        //       img: btn.getAttribute("data-img"),
        //       description: btn.getAttribute("data-description"),
        //       pageCount: btn.getAttribute("data-page"),
        //     };

        //     // Save the book to localStorage for transfer to MainView.html
        //     const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
        //     storedBooks.push(bookData);
        //     localStorage.setItem("books", JSON.stringify(storedBooks));

        //     alert(`Book "${bookData.title}" added to MainView!`);
        //     btn.innerHTML="Remove"
        //     btn.classList.replace("btn-primary", "btn-danger")
        //   });
        // });
      } else {
        resultsDiv.innerHTML = "<p>Results found: 0</p>";
      }
    });
};

searchButton.addEventListener("click", (event) => {
  handleSubmit(event);
});
formSubmit.addEventListener("submit", (event) => {
  handleSubmit(event);
});


