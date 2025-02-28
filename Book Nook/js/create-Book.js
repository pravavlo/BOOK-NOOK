document.getElementById("bookForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pageCount = document.getElementById("pageCount").value.trim();
    const imageFile = document.getElementById("imageInput").files[0];

    if (!title) {
        alert("Title is required!");
        return;
    }

    let finalImageFile = imageFile;

    if (imageFile && imageFile.size > 1024 * 1024) { // If image > 1MB, compress it
        try {
            const options = {
                maxSizeMB: 1, 
                maxWidthOrHeight: 1024, 
                useWebWorker: true
            };
            finalImageFile = await imageCompression(imageFile, options);
        } catch (error) {
            console.error("Image compression failed:", error);
            alert("Error compressing image.");
            return;
        }
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("pageCount", pageCount);
    if (finalImageFile) {
        formData.append("image", finalImageFile);
    }

    fetch("http://localhost:8080/createBooks", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert("Book added successfully!");
        console.log("Server Response:", data);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to add book.");
    });
});
