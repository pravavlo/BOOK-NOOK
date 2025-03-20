const bookListDiv = document.getElementById("book-list");

// Load books from localStorage
const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
const loggedInUser = JSON.parse(sessionStorage.getItem("user")) || [];
fetchBooksFromAPI();
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
                        ${loggedInUser.length != 0 ? `<button class="btn btn-success btn-sm px-4 mt-2" onclick="requestBook(event, ${book.id})">Request Book</button>` : ''}
                    </div>
                    </div>
                `;

    bookListDiv.appendChild(bookCard);
  
  });
} else {
  bookListDiv.innerHTML = "<p>No books added yet.</p>";
}

async function fetchBooksFromAPI() {
  try {
    const response = await fetch("http://localhost:8080/api/books"); // Adjust API URL
    if (!response.ok) throw new Error("Failed to fetch books");

    const apiBooks = await response.json();
    
    // Render API Books Separately using the same innerHTML structure
    apiBooks.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";

      bookCard.innerHTML = `
        <img src="${book.img || book.imageUrl}" alt="${book.title}">
        <div class="book-details">
            <h5 class="truncate">${book.title}</h5>
            <small class="fst-italic truncate">${book.author || "Unknown Author"}</small>
            <small>${book.pageCount || "-"}</small>
            <small class="truncate">${book.description || "-"}</small>
            <div class="d-flex justify-content-start gap-2">
                <button class="btn btn-primary btn-sm px-4 mt-2" onclick="viewBook(false, event, '${book.id}')">View</button>
                <button class="btn btn-danger btn-sm px-4 mt-2" onclick="addOrRemoveBook(false, event, '${book.id}')">Remove</button>
                ${loggedInUser.length !== 0 ? `<button class="btn btn-success btn-sm px-4 mt-2" onclick="requestBook(event, '${book.id}')">Request Book</button>` : ''}
            </div>
        </div>
      `;

      bookListDiv.appendChild(bookCard);
    });

  } catch (error) {
    console.error("Error fetching books:", error);
    bookListDiv.innerHTML = "<p>Failed to load API books.</p>";
  }
}

function requestBook(event, bookId) {
  event.preventDefault();
  const book = storedBooks.find((b) => b.id === bookId);
  if (!book) {
    alert("Book not found.");
    return;
  }

  // Create a book request object
  const request = {
    userName: loggedInUser.name,
    userEmail: loggedInUser.email,
    userPhoto: loggedInUser.photo,
    selectedBookTitle: book.title,
    selectedBookId: book.id,
    requestTime: new Date().toLocaleString(),
  };

  // Store request in localStorage
  let bookRequests = JSON.parse(localStorage.getItem("bookRequests")) || [];
  bookRequests.push(request);
  localStorage.setItem("bookRequests", JSON.stringify(bookRequests));

  alert(`Book "${book.title}" has been requested successfully.`);
}
