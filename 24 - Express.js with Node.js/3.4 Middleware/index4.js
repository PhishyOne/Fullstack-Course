import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

function logger(req, res, next) {
  res.on("finish", () => {
    console.log("----- Request Log -----");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Status Code:", res.statusCode);
    console.log("User IP:", req.ip);
    if (req.body && (req.body.street || req.body.pet)) {
      console.log("Band Name:", `${req.body.street || ""} ${req.body.pet || ""}`.trim());
    }
    console.log("-----------------------\n");
  });
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  const bandName = `${req.body.street} ${req.body.pet}`;
  res.send("Band Name: " + bandName);
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
