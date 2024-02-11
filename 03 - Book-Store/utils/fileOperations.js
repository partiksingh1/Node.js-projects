const fs = require("fs");

const filePath = "./data/data.json"; // Make sure to use the correct file extension (.json)
try {
  const data = fs.readFileSync(filePath, "utf8");
  const bookData = JSON.parse(data);
  //   console.log("Data from json file:", bookData);
  module.exports = bookData;
} catch (err) {
  console.error("Error reading or parsing the file:", err);
  module.exports = null; // or handle the error in some way
}
