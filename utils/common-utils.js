const AWS = require("aws-sdk");
const axios = require("axios");
const cheerio = require("cheerio");

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_AWS_REGION",
});

// Initialize S3 object
const s3 = new AWS.S3();

// Function to fetch HTML from S3
async function fetchHTMLFromS3(s3Url) {
  try {
    const response = await axios.get(s3Url);
    return response.data;
  } catch (error) {
    console.error("Error fetching HTML from S3:", error);
    throw error;
  }
}

// Function to extract tags from HTML
function extractTagsFromHTML(html) {
  console.log("Extract called");
  const $ = cheerio.load(html);
  const tags = [];
  $("*").each((index, element) => {
    const text = $(element).text().trim();
    const regex = /\{\{([^}]+)\}\}/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      tags.push(match[1]);
    }
  });

  return [...new Set(tags)];
}

// Example usage
const s3Url = "YOUR_S3_URL"; // Replace with your S3 URL
fetchHTMLFromS3(s3Url)
  .then((html) => {
    const tags = extractTagsFromHTML(html);
    console.log("Tags:", tags);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
