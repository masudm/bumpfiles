require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const geoip = require("geoip-lite");

const mysql = require("mysql");
const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
});

const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//helper function to escape sql
function e(str) {
	return pool.escape(str);
}

//routes
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/connect", (req, res) => {
	let time = Date.now(); //req.body.time;
	let ip = req.ip;
	let location = geoip.lookup(ip);

	let sql = `INSERT INTO connections (timestamp, ip, location) VALUES (${e(time)}, "${ip}", ${location});`;

	pool.query(sql, function (error, results, fields) {
		if (error) throw error;
		console.log(results.insertId);
	});
});

app.listen(port, () => console.log(`started on port ${port}`));
