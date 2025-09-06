import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});
app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});
app.get("/contact", (req, res) => {
  res.send("<h1>Contact Page</h1>");
});