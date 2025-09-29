import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import project25Routes from "./routes/project25.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3002;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount Project 25 router
app.use("/project25", project25Routes);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Completed Projects Dashboard</h1><p><a href='/project25'>Project 25 - Band Generator</a></p>");
});

app.listen(port, () => {
  console.log(`Server running at on port: ${port}`);
});

