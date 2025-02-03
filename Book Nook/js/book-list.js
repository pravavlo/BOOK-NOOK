const bookListDiv = document.getElementById("book-list");

// Load books from localStorage
const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

if (storedBooks.length > 0) {
  storedBooks.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    bookCard.innerHTML = `
                    <img src="${book.img}" alt="${book.title}">
                    <div class="book-details">
                        <h5 class="truncate">${book.title}</h5>
                        <small class="fst-italic truncate">${
                          book.author || "Unknown Author"
                        }</small>
                        <small>${book.pageCount}</small>
                        <small class="truncate">${
                          book.description || "-"
                        }</small>
                         <div class="d-flex justify-content-start gap-2">
                        <button class="btn btn-primary btn-sm px-4 mt-2" onclick="viewBook(false, event, ${
                          book.id
                        })">View</button>
                        <button class="btn btn-danger btn-sm px-4 mt-2" onclick="addOrRemoveBook(false, event, ${
                          book.id
                        })">Remove</button>
                    </div>
                    </div>
                `;

    bookListDiv.appendChild(bookCard);
  });
} else {
  bookListDiv.innerHTML = "<p>No books added yet.</p>";
}
