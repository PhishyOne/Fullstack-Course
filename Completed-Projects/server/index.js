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

// Mount Project 25 router
app.use("/project25", project25Routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
