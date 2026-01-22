import http from "http";
import app from "./app.js";
import prisma from "./database/prisma.js";
const PORT = process.env.PORT || 3000;
const startSever = async () => {
    try {
        // Connect Prisma
        await prisma.$connect();
        console.log("Prisma connected to the database");
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
    }
    catch (err) {
        console.log("Failed to start server: ", err);
        process.exit(1);
    }
};
startSever();
