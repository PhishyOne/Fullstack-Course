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

router.get("/", async (req, res) => {
  try {
    const count = 5;
    const randomIds = Array.from({ length: count }, () =>
      Math.floor(Math.random() * 247) + 1
    );
    const result = await db.query(
      "SELECT country_code FROM fullstack.countries_33_1 WHERE id = ANY($1::int[])",
      [randomIds]
    );
    const countries = result.rows.map(row => row.country_code);
    console.log(countries);

    for (const code of countries) {
      await db.query(
        "INSERT INTO fullstack.visited_countries_33_1 (country_code) VALUES ($1)",
        [code]
      );
      console.log(`Inserted country code: ${code}`);
    }
    
    res.render("project33-1", {
      countries,
      total: result.rowCount,
    });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).send("Database error");
  }
});

export default router;
