import express from "express";
// Routes
import routes from "./routes/mainRoutes.js";
// dirname & filename
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// NPM Packages
import cors from "cors";
import cookieParser from "cookie-parser";
// SEQUENCE STARTING POINT //
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// ----- ROUTES ----- //
app.use("/", routes);
// 404 Handler (unrecognized URLs)
app.use((req, res, next) => {
    // Check if request expects HTML or JSON
    if (req.accepts("html")) {
        return res.status(404).render("notFound"); // Render notFound.ejs
    }
    if (req.accepts("json")) {
        return res.status(404).json({ success: false, message: "Route not found" });
    }
    // fallback for plain text
    res.status(404).type("txt").send("Not Found");
});
// Global Error Handler
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(err.statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        data: err.data || null,
    });
});
export default app;
