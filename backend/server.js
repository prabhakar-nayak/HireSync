const express = require("express"); //imports the Express framework to create the server and handle routing
const cors = require("cors");

const initializeDB = require("./database/database");

const panelistRoutes = require("./routes/panelistRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const matchRoutes = require("./routes/matchRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express(); //creates an instance of the Express application

app.use(cors()); //allows cross-origin requests from frontend to backend
app.use(express.json()); //reads backend data in json format

const PORT = 5000;

let db = null;

const startServer = async () => {
  try {
    db = await initializeDB();

    await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS panelist_availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    panelist_id INTEGER,
    date TEXT,
    start_time TEXT,
    end_time TEXT,
    interview_type TEXT,
    max_interviews INTEGER
  );

  CREATE TABLE IF NOT EXISTS candidate_availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_name TEXT,
    candidate_email TEXT,
    date TEXT,
    start_time TEXT,
    end_time TEXT
  );

  CREATE TABLE IF NOT EXISTS interviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    panelist_id INTEGER,
    candidate_email TEXT,
    date TEXT,
    start_time TEXT,
    end_time TEXT,
    round TEXT,
    meeting_link TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS interview_status_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  interview_id INTEGER,
  old_status TEXT,
  new_status TEXT,
  changed_at TEXT
    );
`);

    console.log("Database Connected");

    app.get("/", (request, response) => {
      response.send("HireSync Backend Running");
    });

    //defines the routes for panelists, candidates, and matches, passing the database connection to each route handler
    app.use("/api/panelists", panelistRoutes(db));
    app.use("/api/candidates", candidateRoutes(db));
    app.use("/api/matches", matchRoutes(db));
    app.use("/api/interviews", interviewRoutes(db));

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
