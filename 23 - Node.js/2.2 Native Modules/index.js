const fs = require("fs");

fs.writeFile("message.txt", "Hello, world!", (err) => {
  if (err) throw err;
  console.log("File has been saved!");
});

fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File contents: ", data);
});