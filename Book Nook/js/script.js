const searchBtn = document.getElementById("formSubmit");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("searchResult");

formSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value;
  if (query.trim() === "") return;
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsDiv.innerHTML = ""; // Clear previous results

      if (data.items && data.items.length > 0) {
        data.items.forEach((book) => {
          const bookCard = document.createElement("div");
          bookCard.className = "col-6 col-sm-4 col-md-3";
          const bookImage = book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : "https://via.placeholder.com/80x120";

          let description =
            book.volumeInfo.description || "No description available";
          const maxChar = 150; // Maximum characters for the truncated description
          const isTruncated = description.length > maxChar;
          const truncatedDescription = isTruncated
            ? description.substring(0, maxChar) + "..."
            : description;

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
                      <a href="#" class="btn btn-primary btn-sm w-100">View</a>
                    </div>
                    <div class="col-6">
                      <a href="#" class="btn btn-primary btn-sm w-100">Add</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;
          //   bookCard.innerHTML = `
          //                 <img src="${bookImage}" alt="${book.volumeInfo.title}">
          //                 <div class="book-details">
          //                     <h3>${book.volumeInfo.title}</h3>
          //                     <p>${
          //                       book.volumeInfo.authors
          //                         ? book.volumeInfo.authors.join(", ")
          //                         : "Unknown Author"
          //                     }</p>
          //                     <p>${book.volumeInfo.publishedDate || "No Date"}</p>
          //                     <p>${book.volumeInfo.pageCount || "N/A"} pages</p>
          //                     <p class="description">
          //                         <span class="short-desc">${truncatedDescription}</span>
          //                         ${
          //                           isTruncated
          //                             ? `<span class="full-desc" style="display:none;">${description}</span>`
          //                             : ""
          //                         }
          //                         ${
          //                           isTruncated
          //                             ? '<button class="read-more-btn">Read More</button>'
          //                             : ""
          //                         }
          //                     </p>
          //                     <button class="add-btn"
          //                         data-title="${book.volumeInfo.title}"
          //                         data-author="${
          //                           book.volumeInfo.authors
          //                             ? book.volumeInfo.authors.join(", ")
          //                             : "Unknown Author"
          //                         }"
          //                         data-description="${description}"
          //                         data-page="${
          //                           book.volumeInfo.pageCount || "N/A"
          //                         }"
          //                         data-img="${bookImage}">
          //                         Add Book
          //                     </button>
          //                 </div>
          //             `;

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
        document.querySelectorAll(".add-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const bookData = {
              title: btn.getAttribute("data-title"),
              author: btn.getAttribute("data-author"),
              img: btn.getAttribute("data-img"),
              description: btn.getAttribute("data-description"),
              pageCount: btn.getAttribute("data-page"),
            };

            // Save the book to localStorage for transfer to MainView.html
            const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
            storedBooks.push(bookData);
            localStorage.setItem("books", JSON.stringify(storedBooks));

            alert(`Book "${bookData.title}" added to MainView!`);
          });
        });
      } else {
        resultsDiv.innerHTML = "<p>No books found.</p>";
      }
    });
});
