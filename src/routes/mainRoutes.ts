import express from "express";

const router = express.Router();

router.get("/test", (_req, res, _next) => {
	res.json({ data: "TEST" });
});

router.post("/shorten", (req, res, next) => {
	const url: string = req.url;
});

export default router;
