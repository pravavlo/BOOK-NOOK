const imageInput = document.getElementById("imageInput");
const resultsTable = document.getElementById("resultsTable");
const outputContainer = document.getElementById("output");
const btnClear = document.getElementById("btnClear");

imageInput.addEventListener("change", async (event) => {
  const files = event.target.files;
  if (!files.length) return;
  btnClear.classList.remove("d-none");
  outputContainer.classList.remove("d-none");
  resultsTable.innerHTML = ""; // Clear the table for new uploads

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const imgData = reader.result;

      // Create a new row in the table
      const newRow = document.createElement("tr");
      newRow.classList.add("align-middle")
      newRow.innerHTML = `
            <td><img src="${imgData}" alt="Book Cover" style="height: 100px;"></td>
            <td><div class="book-extractor-loader"></div></td>
          `;
      resultsTable.appendChild(newRow);

      // Extract text using Tesseract.js
      try {
        const {
          data: { text },
        } = await Tesseract.recognize(imgData, "eng");
        newRow.cells[1].innerHTML = `<p>${
          text.trim() || "No text detected"
        }</p>`;
      } catch (error) {
        newRow.cells[1].innerHTML = "<p>Error processing image</p>";
        console.error("OCR Error:", error);
      }
    };

    reader.readAsDataURL(file); // Read the image as a data URL
  });
});

btnClear.addEventListener("click", async (event) => {
  imageInput.value = "";
  resultsTable.innerHTML = "";
  outputContainer.classList.add("d-none");
  btnClear.classList.add("d-none");
});

