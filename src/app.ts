import express from "express";

import routes from "./routes/mainRoutes";

// NPM Packages
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ----- ROUTES ----- //
app.use("/", routes);

export default app;
