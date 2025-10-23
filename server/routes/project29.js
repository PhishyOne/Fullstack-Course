import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.render("project29/index");
    } catch (error) {
        res.render("project29/index");
    }
});

export default router;