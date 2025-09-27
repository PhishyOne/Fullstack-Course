import express from "express";

const app = express();
const port = 3000;

function logger (req, res, next) {
  console.log("Request Method: " + `${req.method}`);
  console.log("Request URL: " + `${req.url}`);
  console.log("Response Code: " + `${res.statusCode}`);
  console.log("User ip: " + `${req.ip}`);
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
