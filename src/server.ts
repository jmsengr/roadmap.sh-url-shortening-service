import http from "http";
import app from "./app";

const PORT = process.env.PORT || 3000;

// Create HTTP server and pass Express apps
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log("Server running on port ", PORT);
});

// graceful shutdown handling
process.on("SIGTERM", () => {
	console.log("SIGTERM recieved, closing server... ");
	server.close(() => console.log("Server closed"));
});
