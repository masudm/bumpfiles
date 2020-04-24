var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var geoip = require("geoip-lite");

var ids = [];

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	//so the basic way it works is users are added into a queue (id, timestamp, preferably location)
	// note these users are cleared after 10 seconds
	//if another user is added into the queue with similar timestamp (and preferably location) they are connected
	//the first user is the initiator - I
	//the second user is the reciever - R
	//the offer from I is sent to R who creates an answer
	//R sends their answer to I who verifies it
	//they are connected
	console.log("a user connected");

	var socketId = socket.id;
	var ip = socket.handshake.headers["x-real-ip"] || socket.handshake.address;
	var port = socket.handshake.headers["x-real-port"];
	var geo = geoip.lookup(ip);

	ids.push(socketId);

	socket.on("offer", (msg) => {
		console.log("message: " + msg);
	});

	socket.on("answer", (msg) => {
		console.log("message: " + msg);
	});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
