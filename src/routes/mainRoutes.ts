import express from "express";

const router = express.Router();

router.get("/test", (_req, res, _next) => {
	res.json({ data: "TEST" });
});

export default router;
