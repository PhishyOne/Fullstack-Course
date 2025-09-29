import express from "express";
const router = express.Router();

// homepage
router.get("/", (req, res) => {
    res.render("project25/index", { title: "Project 25 - Band Generator" });
});

// random band generator API
router.get("/api/band", (req, res) => {
    const adjectives = ["Funky", "Wild", "Electric", "Silent", "Loud"];
    const nouns = ["Dragons", "Penguins", "Wolves", "Pirates", "Crows"];
    const bandName =
        adjectives[Math.floor(Math.random() * adjectives.length)] +
        " " +
        nouns[Math.floor(Math.random() * nouns.length)];
    res.json({ band: bandName });
});

export default router;
