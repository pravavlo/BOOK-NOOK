// Add active link functionality in navbar
const navbarLinks = document.querySelectorAll(".navbar a");
navbarLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.style.fontWeight = "bold";
    link.style.textDecoration = "underline";
  }
});

const baseUrl = "file:///C:/All%20Files/FlexTecs/BOOK-NOOK/Book%20Nook/";

function viewBook(isFromIndex, event, index) {
  if (isFromIndex) {
    const bookData = {
      id: index,
      title: event.target.getAttribute("book-title"),
      author: event.target.getAttribute("book-author"),
      img: event.target.getAttribute("book-thumbnail"),
      description: event.target.getAttribute("book-description"),
      pageCount: event.target.getAttribute("book-page-count"),
    };
    sessionStorage.setItem("viewBook", JSON.stringify(bookData));
  }
  window.location.href = `${baseUrl}/book.html?id=${index}`;
}

// function addOrRemoveBook(isFromIndex, event, id) {
//   const buttonText = event.target.innerText;
//   const books = JSON.parse(localStorage.getItem("books"));
//   console.log("BOOKS:", books )
//   if (books.length > 0) {
//     const newBookList = books.filter((b) => b.id != id);
//     console.log("BOOK: ", newBookList);
//     localStorage.setItem("books", JSON.stringify(newBookList));
//     window.location.reload();
//   }
//   else{
//     books.push()
//   }
// }

function addOrRemoveBook(isFromIndex, event, index) {
  let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  if (!isFromIndex) {
    if (storedBooks.length > 0) {
      const newBookList = storedBooks.filter((b) => b.id != index);
      localStorage.setItem("books", JSON.stringify(newBookList));
      window.location.reload();
    }
    return;
  }
  const bookData = {
    id: index,
    title: event.target.getAttribute("book-title"),
    author: event.target.getAttribute("book-author"),
    img: event.target.getAttribute("book-thumbnail"),
    description: event.target.getAttribute("book-description"),
    pageCount: event.target.getAttribute("book-page-count"),
  };
  //Save the book to localStorage for transfer to MainView.html

  if (storedBooks.some((b) => b.title == bookData.title)) {
    storedBooks = storedBooks.filter((b) => b.title !== bookData.title);
    alert(`Book "${bookData.title}" removed!`);
    event.target.innerHTML = "Add";
    event.target.classList.replace("btn-danger", "btn-primary");
  } else {
    storedBooks.push(bookData);
    alert(`Book "${bookData.title}" added!`);
    event.target.innerHTML = "Remove";
    event.target.classList.replace("btn-primary", "btn-danger");
  }
  localStorage.setItem("books", JSON.stringify(storedBooks));
}
