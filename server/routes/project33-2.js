import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public"));

const db = new pg.Client({
  user: "ufp1ais6lj4me0",
  host: "cet8r1hlj0mlnt.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com",
  database: "daiavg0tvubkqb",
  password: "p6c62e7eb19afc5f9566f7a7411bdd0454f02dd8c3094a7ec7d4056edb7f04edd",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
await db.connect();

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM fullstack.visited_countries_33_2");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
router.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("project33-2/index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});
router.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/project33-2");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/user", async (req, res) => {});

router.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

export default router;