const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("um usuário conectado");

	socket.on("chat message", (msg) => {
		io.emit("mensagem de bate-papo", msg);
	});

	socket.on("disconnect", () => {
		console.log("usuário desconectado");
	});
});

server.listen(3000, () => {
	console.log("escutando em *:3000")
});