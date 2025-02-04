// netlify/functions/fetch-books.js
exports.handler = async (event) => {
    const { query } = event.queryStringParameters; // Get the query from the request
    const API_KEY = process.env.Prod_GOOGLE_API_KEY; // Access the environment variable
  
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data), // Return the API response
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }
  };