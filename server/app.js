require("dotenv").config();

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { log: false, origins: "*:*" });
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

const port = 3001;
const interval = 1000; //t - interval <= t <= t + interval  within this interval to be considered (ms)

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	next();
});

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
		let ip = 0; //socket.request.connection.remoteAddress;
		let location = geoip.lookup(ip);
		let deviceId = socket.id;
		console.log(time, ip, location, deviceId);

		let sql = `INSERT INTO connections (timestamp, ip, location, device) 
		VALUES (${time}, "${ip}", ${location}, "${deviceId}");`;

		pool.query(sql, function (error, results, fields) {
			if (error) throw error;

			let sql = `SELECT * FROM connections WHERE id != '${results.insertId}'
			AND device != "${deviceId}"
			AND timestamp BETWEEN ${time - interval} AND ${time + interval}`;
			pool.query(sql, function (error, results, fields) {
				//there could be more than 1. todo: confidence level
				if (results.length == 1) {
					roomId = "abc";
					io.to(deviceId).emit("bumped", { initiator: true, room: roomId, recipient: results[0].device });
					io.to(results[0].device).emit("bumped", { initiator: false, room: roomId, recipient: deviceId });

					console.log("bumped: " + results[0].device);
				}
			});
		});
	});

	socket.on("p2p", function (data) {
		io.to(data.recipient).emit("p2p", { offer: data.offer, username: data.username });
	});
});

http.listen(port, () => {
	console.log("listening on " + port);
});

//cleanup mysql rows since we do not need old rows
//every minute delete any rows that are more than 10 seconds old
setInterval(() => {
	pool.query(`DELETE FROM connections WHERE timestamp < ${Date.now() - 10 * 1000}`, function (error, results) {
		//console.log(error, results);
	});
}, 60 * 1000);
