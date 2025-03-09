// Add active link functionality in navbar
window.addEventListener("load", function () {
  var navbarLinks = document.querySelectorAll(".nav-link");
  navbarLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});

//const baseUrl = "file:///C:/All%20Files/FlexTecs/BOOK-NOOK/Book%20Nook/";
const baseUrl = window.location.hostname;

function viewBook(isFromIndex, event, index) {
  if (isFromIndex) {
    const bookData = {
      id: index,
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
    id: index,
    title: event.target.getAttribute("book-title"),
    author: event.target.getAttribute("book-author"),
    img: event.target.getAttribute("book-thumbnail"),
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
    {
      userName: "Sophia Turner",
      userEmail: "sophia@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "Atomic Habits",
      requestTime: "March 11 2025",
    },
    {
      userName: "Liam Johnson",
      userEmail: "liam@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "The Power of Now",
      requestTime: "March 12 2025",
    },
    {
      userName: "Olivia Parker",
      userEmail: "olivia@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "Think and Grow Rich",
      requestTime: "March 13 2025",
    },
    {
      userName: "Noah Wilson",
      userEmail: "noah@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "The 5 AM Club",
      requestTime: "March 14 2025",
    },
    {
      userName: "Emma Davis",
      userEmail: "emma@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "How to Win Friends and Influence People",
      requestTime: "March 15 2025",
    },
    {
      userName: "James Miller",
      userEmail: "james@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "The Subtle Art of Not Giving a F*ck",
      requestTime: "March 16 2025",
    },
    {
      userName: "Ava Garcia",
      userEmail: "ava@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "You Are a Badass",
      requestTime: "March 17 2025",
    },
    {
      userName: "William Martinez",
      userEmail: "william@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "The Alchemist",
      requestTime: "March 18 2025",
    },
    {
      userName: "Mia Brown",
      userEmail: "mia@test.com",
      userPhoto: "https://placehold.co/150",
      selectedBookTitle: "The Monk Who Sold His Ferrari",
      requestTime: "March 19 2025",
    },
  ];

  localStorage.setItem("bookRequests", JSON.stringify(requestedBooks));
});
