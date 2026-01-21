import express from "express";

import routes from "./routes/mainRoutes.js";

// dirname & filename
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// NPM Packages
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ----- ROUTES ----- //
app.use("/", routes);

export default app;
