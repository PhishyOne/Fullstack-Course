import express from "express";

const app = express();
const port = 3002;

// tell Express to use EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const d = new Date();
    const dayNum = d.getDay();
    let day = "";

    if (dayNum === 0 || dayNum === 6 || dayNum === 5) {
        day = "weekend. It's time to party!";
    } else {
        day = "weekday. It's time to work hard.";
    }

    res.render("index", { day });
});

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
