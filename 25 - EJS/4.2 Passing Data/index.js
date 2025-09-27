import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: true }));

// Always blank on refresh
app.get("/", (req, res) => {
  res.render("index.ejs", { nameCounter: null });
});

app.post("/submit", (req, res) => {
  const firstName = req.body.fName.trim();
  const lastName = req.body.lName.trim();

  if (!firstName && !lastName) {
    return res.redirect("/");
  }

  const nameCounter = firstName.length + lastName.length;

  // Pass result via query so refresh doesn’t resubmit
  res.redirect(`/result?count=${nameCounter}`);
});

app.get("/result", (req, res) => {
  const count = req.query.count;

  if (!count) {
    return res.redirect("/"); // no count → reset
  }

  res.render("index.ejs", { nameCounter: count });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});