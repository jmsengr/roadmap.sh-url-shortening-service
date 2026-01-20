"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
// Create HTTP server and pass Express apps
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});
// graceful shutdown handling
process.on("SIGTERM", () => {
    console.log("SIGTERM recieved, closing server... ");
    server.close(() => console.log("Server closed"));
});
