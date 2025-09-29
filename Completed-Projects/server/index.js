import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3002;

// view engine setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// serve static files
app.use(express.static(__dirname + "/public"));

// routes
import project25Routes from "./routes/project25.js";
app.use("/project25", project25Routes);

// dashboard
app.get("/", (req, res) => {
    res.send(`
    <h1>Completed Projects Dashboard</h1>
    <ul>
      <li><a href="/project25">Project 25 - Band Generator</a></li>
    </ul>
  `);
});

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
