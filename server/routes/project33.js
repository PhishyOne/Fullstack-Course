import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const router = express.Router();

const db = new pg.Pool({
  user: "ufp1ais6lj4me0",
  host: "cet8r1hlj0mlnt.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com",
  database: "daiavg0tvubkqb",
  password: "p6c62e7eb19afc5f9566f7a7411bdd0454f02dd8c3094a7ec7d4056edb7f04edd",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

// Load quiz data once at startup
async function loadQuiz() {
  try {
    const result = await db.query("SELECT * FROM capitals");
    quiz = result.rows;
    console.log(`Loaded ${quiz.length} questions`);
  } catch (err) {
    console.error("Error loading quiz:", err);
  }
}

loadQuiz();

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public"));

// Helpers
function nextQuestion() {
  if (quiz.length === 0) return null;
  currentQuestion = quiz[Math.floor(Math.random() * quiz.length)];
  return currentQuestion;
}

// Routes
router.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();

  res.render("project33/index.ejs", {
    question: currentQuestion,
  });
});

router.post("/submit", (req, res) => {
  const answer = req.body.answer?.trim() ?? "";
  let isCorrect = false;

  if (
    currentQuestion &&
    currentQuestion.capital.toLowerCase() === answer.toLowerCase()
  ) {
    totalCorrect++;
    isCorrect = true;
  }

  nextQuestion();

  res.render("project33/index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

export default router;
