import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import project25Routes from "./routes/project25.js";
import project28Routes from "./routes/project28.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3002;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount Project routers
app.use("/project25", project25Routes);
app.use("/project28", project28Routes);
app.use("/project29", project29Routes);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Completed Projects Dashboard</h1>" +
    "<p><a href='/project25'>Project 25 - Band Generator</a></p>" +
    "<p><a href='/project28'>Project 28 - Secrets</a></p>" +
    "<p><a href='/project29'>Project 29 - Capstone Project - Eve Echoes PlayInt</a></p>");
});

app.listen(port, () => {
  console.log(`Server running at on port: ${port}`);
});

