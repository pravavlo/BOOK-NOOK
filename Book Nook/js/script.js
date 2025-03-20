// Add active link functionality in navbar
window.addEventListener("load", function () {
  var navbarLinks = document.querySelectorAll(".nav-link");
  navbarLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});


const baseUrl = window.location.hostname;

function viewBook(isFromIndex, event, index) {
  if (isFromIndex) {
    const bookData = {
      id: event.target.getAttribute("book-id"),
      title: event.target.getAttribute("book-title"),
      author: event.target.getAttribute("book-author"),
      img: event.target.getAttribute("book-thumbnail"),
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
    id: event.target.getAttribute("book-id"),
    title: event.target.getAttribute("book-title"),
    author: event.target.getAttribute("book-author"),
    imageUrl: event.target.getAttribute("book-thumbnail"),
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
    fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save book");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Book saved:", data);
      })
      .catch((error) => {
        console.error("Error saving book:", error);
      });
    alert(`Book "${bookData.title}" added!`);
    event.target.innerHTML = "Remove";
    event.target.classList.replace("btn-primary", "btn-danger");

  }
  localStorage.setItem("books", JSON.stringify(storedBooks));
}

// Add Dummy Data As Book Requests
window.addEventListener("load", function () {
  var requestedBooks = [
    {
      userName: "Adam Rockers",
      userEmail: "adam@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "Rich Dad Poor Dad",
      requestTime: "March 10 2025",
    },
    
   
  ];

  localStorage.setItem("bookRequests", JSON.stringify(requestedBooks));
});
