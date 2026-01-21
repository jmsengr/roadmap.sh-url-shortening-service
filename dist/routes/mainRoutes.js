import express from "express";
const router = express.Router();
router.get("/", (req, res, next) => {
    res.render("../.views/main.ejs");
});
router.get("/test", (_req, res, _next) => {
    res.json({ data: "TEST" });
});
router.post("/shorten", (req, res, next) => {
    const url = req.url;
});
export default router;
