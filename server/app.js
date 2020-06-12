require("dotenv").config();

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
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

io.on("connection", (socket) => {
	socket.on("bump", function (data) {
		let time = e(data.time);
		let ip = socket.request.connection.remoteAddress;
		let location = geoip.lookup(ip);
		let deviceId = socket.id;
		console.log(time, ip, location, deviceId);

		let sql = `INSERT INTO connections (timestamp, ip, location, device) 
		VALUES (${time}, "${ip}", ${location}, "${deviceId}");`;

		pool.query(sql, function (error, results, fields) {
			if (error) throw error;

			let sql = `SELECT * FROM connections WHERE id != '${results.insertId}'
			AND timestamp BETWEEN ${time - 1000} AND ${time + 1000}`;
			console.log(sql);
			pool.query(sql, function (error, results, fields) {
				console.log(results);
			});
		});
	});
});

http.listen(3000, () => {
	console.log("listening on " + port);
});
