console.log(window.location.search);
const key = window.location.search;
const id = key.slice(4);
const books = JSON.parse(localStorage.getItem("books"));
const bookFromSession = JSON.parse(sessionStorage.getItem("viewBook"));
if (bookFromSession) {
  document.querySelector(".book-title").innerHTML = bookFromSession.title;
  document.querySelector(".book-author").innerHTML = bookFromSession.author;
  document.querySelector(".book-thumbnail").src = bookFromSession.img;
  document.querySelector(".book-page-count").innerHTML =
    bookFromSession.pageCount;
  document.querySelector(
    ".btn-remove"
  ).innerHTML = `<button class="btn btn-danger btn-sm" onclick="addOrRemoveBook(false, event, ${bookFromSession.id})">Remove</button>`;
  sessionStorage.removeItem("viewBook");
} else {
  if (books.length > 0) {
    const book = books.find((b) => b.id == id);
    if (!book) {
      console.log("Book Not Available");
    } else {
      document.querySelector(".book-title").innerHTML = book.title;
      document.querySelector(".book-author").innerHTML = book.author;
      document.querySelector(".book-thumbnail").src = book.img;
      document.querySelector(".book-page-count").innerHTML = book.pageCount;
      document.querySelector(
        ".btn-remove"
      ).innerHTML = `<button class="btn btn-danger btn-sm" onclick="addOrRemoveBook(false, event, ${book.id})">Remove</button>`;
    }
  } else {
    console.log("Book Not Available");
  }
}
