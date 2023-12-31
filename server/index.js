const express = require("express");
// const cors = require('cors')
const bodyParser = require("body-parser");
// const router =require('./routes/router.js')

const app = express();

app.use(bodyParser.json()); // for parsing post data that has json format//
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT, DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// youtube video
// const corsOptions = {
//   origin:'*',
//   Credential: true,
//   optionSuccessStatus:200
// }

// app.use(cors(corsOptions))
// app.use('/',router)

// Connect to PostgreSQL database (using 'pg' library)
const { Pool } = require("pg");
const pool = new Pool({
  user: "ag2417_23_g6",
  host: "130.237.64.7",
  database: "ag2417_23",
  password: "ag2417_23_g6_password",
  port: "5435", // 默认的PostgreSQL端口
});

// youtube video
// Define routes (e.g., playerRoutes.js)
// const playerRoutes = require('./routes/playerRoutes');
// app.use('/api/players', playerRoutes);

// get players data
app.get("/player/get_players", (req, res) => {
  pool.query("select * from players ORDER BY pid ASC", (err, dbResponse) => {
    if (err) console.log(err);
    // Your data processing logic goes here
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(dbResponse.rows);
  });
});

// get stations data
app.get("/stations/get_stations", (req, res) => {
  pool.query("select * from stations ORDER BY cid ASC", (err, dbResponse) => {
    if (err) console.log(err);
    // Your data processing logic goes here
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(dbResponse.rows);
  });
});

// get levelfeatures data
app.get("/level/levelfeatures", (req, res) => {
  pool.query("select * from levelfeatures", (err, dbResponse) => {
    if (err) console.log(err);
    // Your data processing logic goes here
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(dbResponse.rows);
  });
});

const port = 5000; // Choose a suitable port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
