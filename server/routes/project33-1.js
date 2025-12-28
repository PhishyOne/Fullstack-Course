import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public"));

router.get("/", async (req, res) => {
  //Write your code here.
});

export default router;