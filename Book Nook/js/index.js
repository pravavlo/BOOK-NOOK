import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,  signOut as firebaseSignOut, setPersistence,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const searchBtn = document.getElementById("formSubmit");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("searchResult");
const searchButton = document.getElementById("search-btn");
const signInButton = document.getElementById("google-sign-in-btn");
const logoutButton = document.getElementById("sign-out-btn");
const userInfoContainer = document.getElementById("user-info-container");
const userPhoto = document.getElementById("user-photo");
const userName = document.getElementById("user-name");
const API_KEY = typeof GOOGLE_API_KEY !== "undefined" ? GOOGLE_API_KEY : "production run";
const booksFromLocalStorage = JSON.parse(localStorage.getItem("books")) || [];
document.addEventListener("DOMContentLoaded", () => {
  searchInput.value = sessionStorage.getItem("searchQuery") || "";
  handleSubmit(event);
});

const firebaseConfig = {
  apiKey: "AIzaSyC07NCezdAfjhvO13lgRcpYn8rHo5zdaVY",

  authDomain: "book-nook-c21a0.firebaseapp.com",

  projectId: "book-nook-c21a0",

  storageBucket: "book-nook-c21a0.firebasestorage.app",

  messagingSenderId: "1000473432341",

  appId: "1:1000473432341:web:5890f3cd87ed946224d91c",

  measurementId: "G-VX4GBDL4V5"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Ensure users must always choose an account
auth.languageCode = 'en';
const googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Signed in:", result.user);
      updateUI(result.user);
    })
    .catch((error) => console.error("Sign-in error:", error));
};

// Sign-Out
const signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      console.log("User signed out.");
      updateUI(null);
    })
    .catch((error) => console.error("Sign-out error:", error));
};

// Update UI based on auth state
const updateUI = (user) => {
  if (user) {
    userName.textContent = user.displayName;
    userPhoto.src = user.photoURL;
    userInfoContainer.style.display = "block";
    signInButton.style.display = "none";
  } else {
    userInfoContainer.style.display = "none";
    signInButton.style.display = "inline-block";
  }
};

// Listen for auth state changes (fixes refresh issue)
onAuthStateChanged(auth, (user) => {
  updateUI(user);
});

// Attach event listeners
signInButton.addEventListener("click", googleSignIn);
logoutButton.addEventListener("click", signOut);

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
  if (API_KEY != "production run") {
    // uncomment the commented fetch google api wehn u dont have hte key else proceed accordingly
    //fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
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
                    src="${bookImage}" alt="${book.volumeInfo.title
              }" class="img-fluid rounded-start"
                  />
                </div>
              </div>
              <div class="col-12 col-md-8">
                <div
                  class="card-body d-flex flex-column justify-content-between gap-3"
                >
                  <div>
                    <h5 class="card-title text-truncate">${book.volumeInfo.title
              }</h5>
                    <small class="card-text fst-italic truncate">
                    ${book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown Author"
              }
                      </small>
                  </div>

                
                  <div class="row">
                    <div class="col-6">
                      <a href="#" class="btn btn-primary btn-sm w-100 text-nowrap" book-title="${book.volumeInfo.title
              }" book-author="${book.volumeInfo.authors
              }" book-page-count="${book.volumeInfo.pageCount
              }" book-description="${description}" book-thumbnail="${bookImage}" id="btnView${index}" onclick="viewBook(true, event, ${index})">View</a>
                    </div>
                    <div class="col-6">
                      <button class="btn ${booksFromLocalStorage
                .map((b) => b.title)
                .includes(book.volumeInfo.title)
                ? "btn-danger"
                : "btn-primary"
              } btn-sm w-100 add-btn text-nowrap" id="btnDelete${index}" onclick="addOrRemoveBook(true, event, ${index})"  book-title="${book.volumeInfo.title
              }" 
                                book-author="${book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown Author"
              }"
                                book-description="${description}" 
                                book-page-count="${book.volumeInfo.pageCount || "N/A"
              }"
                                book-thumbnail="${bookImage}">${booksFromLocalStorage
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


        } else {
          resultsDiv.innerHTML = "<p>Results found: 0</p>";
        }
      });
  }
  else {
    fetch(`/.netlify/functions/fetch-books?query=${encodeURIComponent(query)}`)
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
                  src="${bookImage}" alt="${book.volumeInfo.title
              }" class="img-fluid rounded-start"
                />
              </div>
            </div>
            <div class="col-12 col-md-8">
              <div
                class="card-body d-flex flex-column justify-content-between gap-3"
              >
                <div>
                  <h5 class="card-title text-truncate">${book.volumeInfo.title
              }</h5>
                  <small class="card-text fst-italic truncate">
                  ${book.volumeInfo.authors
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
                    <a href="#" class="btn btn-primary btn-sm w-100 text-nowrap" book-title="${book.volumeInfo.title
              }" book-author="${book.volumeInfo.authors
              }" book-page-count="${book.volumeInfo.pageCount
              }" book-description="${description}" book-thumbnail="${bookImage}" id="btnView${index}" onclick="viewBook(true, event, ${index})">View</a>
                  </div>
                  <div class="col-6">
                    <button class="btn ${booksFromLocalStorage
                .map((b) => b.title)
                .includes(book.volumeInfo.title)
                ? "btn-danger"
                : "btn-primary"
              } btn-sm w-100 add-btn text-nowrap" id="btnDelete${index}" onclick="addOrRemoveBook(true, event, ${index})"  book-title="${book.volumeInfo.title
              }" 
                              book-author="${book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown Author"
              }"
                              book-description="${description}" 
                              book-page-count="${book.volumeInfo.pageCount || "N/A"
              }"
                              book-thumbnail="${bookImage}">${booksFromLocalStorage
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
}
searchButton.addEventListener("click", (event) => {
  handleSubmit(event);
});
formSubmit.addEventListener("submit", (event) => {
  handleSubmit(event);
});





